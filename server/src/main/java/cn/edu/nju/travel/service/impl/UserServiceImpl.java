package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.constant.UserStateCode;
import cn.edu.nju.travel.dao.AdminDao;
import cn.edu.nju.travel.dao.AuthenticationDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.AdminEntity;
import cn.edu.nju.travel.entity.AuthenticationEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.MD5Encryption;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.UserAuthVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created on 2019/1/14
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    AdminDao adminDao;

    @Autowired
    AuthenticationDao authenticationDao;

    @Autowired
    FileService fileService;

    @Override
    public void register(String name, String mobile, String mail, String password, String logoUrl)
            throws Exception {
        if(userDao.findByName(name) != null){
            throw new ServerException(ResponseCode.Error, "用户名已存在");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setName(name);
        userEntity.setMobile(mobile);
        userEntity.setMail(mail);
        userEntity.setPassword(MD5Encryption.encrypt(password));
        userEntity.setLogoUrl(logoUrl);
        userEntity.setState(UserStateCode.UNCERTIFIED.getIndex());
        userDao.save(userEntity);

    }

    @Override
    public UserInfoVO modifyInfo(int userId, String mobile, String mail, String logoUrl) {
        //todo
        return null;
    }

    @Override
    public void changePassword(int userId, String password) {
        //todo
    }

    @Override
    public UserInfoVO login(String name, String password, RoleTypeCode code) throws Exception {
        switch (code){
            case USER:
                UserEntity userEntity = userDao.findByNameAndPassword(name, MD5Encryption.encrypt
                        (password));
                if(userEntity == null){
                    throw new ServerException(ResponseCode.Error, "用户名或密码错误");
                }
                return new UserInfoVO(userEntity);
            case ADMIN:
                AdminEntity adminEntity = adminDao.findByNameAndPassword(name, MD5Encryption
                        .encrypt(password));
                if(adminEntity == null){
                    throw new ServerException(ResponseCode.Error,"管理员用户名或密码错误");
                }
                return new UserInfoVO(adminEntity);
            default:
                throw new ServerException(ResponseCode.Error, "用户类型错误");
        }
    }

    @Override
    public UserInfoVO findById(Integer id) {
        UserEntity entity = userDao.findById(id).get();
        return new UserInfoVO(entity);
    }

    @Override
    public List<UserInfoVO> findAllById(List<Integer> idList) {
        Iterable<UserEntity> entitys = userDao.findAllById(idList);
        List<UserInfoVO> userInfoVOList = new ArrayList<>();
        for(UserEntity entity : entitys){
            userInfoVOList.add(new UserInfoVO(entity));
        }
        return userInfoVOList;
    }

    @Override
    public UserAuthVO uploadAuthInfo(int userId, String attachUrl, String context)
            throws Exception {
        AuthenticationEntity authenticationEntity = authenticationDao.findByUserId(userId);
        if(authenticationEntity == null){
            authenticationEntity = new AuthenticationEntity();
            authenticationEntity.setUserId(userId);
        }else{
            if (authenticationEntity.getState() == ApproveStateCode.ACCEPT.getIndex()){
                throw new ServerException(ResponseCode.Error, "认证审批已通过，不可修改");
            }
            //删除原来的认证图片
            String oldUrl = authenticationEntity.getAttachmentUrl();
            if (!attachUrl.equals(oldUrl)){
                fileService.deleteOldFile(oldUrl);
            }
        }
        authenticationEntity.setAttachmentUrl(attachUrl);
        authenticationEntity.setContext(context);
        authenticationEntity.setState(ApproveStateCode.NEW.getIndex());

        return new UserAuthVO(authenticationEntity);
    }

    @Override
    public UserAuthVO getAuthInfo(int userId) {
        AuthenticationEntity entity = authenticationDao.findByUserId(userId);
        return entity==null?null:new UserAuthVO(entity);
    }

    @Override
    public List<UserAuthVO> getAuthInfoOnePage(Integer lastId, int pageSize,
            ApproveStateCode state) {
        return null;
    }


}
