package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.dao.AuthenticationDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.AuthenticationEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.AuthService;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.UserAuthVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created on 2019/1/16
 */
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationDao authenticationDao;

    @Autowired
    UserDao userDao;

    @Autowired
    FileService fileService;

    @Value("${travel.constant.pageSize}")
    int pageSize;

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

        AuthenticationEntity savedEntity = authenticationDao.save(authenticationEntity);
        return this.userAuthVOWrap(savedEntity);
    }

    @Override
    public UserAuthVO getAuthInfo(int userId) {
        AuthenticationEntity entity = authenticationDao.findByUserId(userId);
        if(entity == null){
            UserAuthVO userAuthVO = new UserAuthVO();
            userAuthVO.setUserId(userId);
            userAuthVO.setState(ApproveStateCode.NO_APPLY);
            return userAuthVO;
        }
        return this.userAuthVOWrap(entity);
    }

    @Override
    public List<UserAuthVO> getAuthInfoOnePageByState(int lastId, ApproveStateCode state) {
        List<AuthenticationEntity> entityList = authenticationDao.findNextAuthListByState
                (lastId,state.getIndex(),pageSize);
        return entityList.stream().map(this::userAuthVOWrap).collect(
                Collectors.toList());
    }

    @Override
    public List<UserAuthVO> getAuthInfoOnePage(int lastId) {
        List<AuthenticationEntity> entityList = authenticationDao.findNextAuthListAll(lastId,
                pageSize);
        return entityList.stream().map(this::userAuthVOWrap).collect(
                Collectors.toList());
    }

    @Override
    public UserAuthVO authUser(int userId, ApproveStateCode state) {
        AuthenticationEntity entity = authenticationDao.findByUserId(userId);
        entity.setState(state.getIndex());
        return this.userAuthVOWrap(authenticationDao.save(entity));
    }

    private UserAuthVO userAuthVOWrap(AuthenticationEntity entity){
        UserEntity userEntity = userDao.findById(entity.getUserId());
        return new UserAuthVO(entity, new UserInfoVO(userEntity));
    }

}
