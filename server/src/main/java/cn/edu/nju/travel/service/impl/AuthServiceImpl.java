package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.dao.AuthenticationDao;
import cn.edu.nju.travel.entity.AuthenticationEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.AuthService;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.UserAuthVO;
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

        return new UserAuthVO(authenticationDao.save(authenticationEntity));
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
        return new UserAuthVO(entity);
    }

    @Override
    public List<UserAuthVO> getAuthInfoOnePageByState(int lastId, ApproveStateCode state) {
        List<AuthenticationEntity> entityList = authenticationDao.findNextAuthListByState
                (lastId,state.getIndex(),pageSize);
        return entityList.stream().map(UserAuthVO::new).collect(
                Collectors.toList());
    }

    @Override
    public List<UserAuthVO> getAuthInfoOnePage(int lastId) {
        List<AuthenticationEntity> entityList = authenticationDao.findNextAuthListAll(lastId,
                pageSize);
        return entityList.stream().map(UserAuthVO::new).collect(
                Collectors.toList());
    }

    @Override
    public UserAuthVO authUser(int userId, ApproveStateCode state) {
        AuthenticationEntity entity = authenticationDao.findByUserId(userId);
        entity.setState(state.getIndex());
        return new UserAuthVO(authenticationDao.save(entity));
    }

}
