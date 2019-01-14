package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.constant.UserStateCode;
import cn.edu.nju.travel.dao.AdminDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.AdminEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.MD5Encryption;
import cn.edu.nju.travel.vo.UserInfoVO;
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

    @Override
    public void register(String name, String mobile, String mail, String password, String logoUrl)
            throws Exception {
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
                return userEntity!=null?new UserInfoVO(userEntity):null;
            case ADMIN:
                AdminEntity adminEntity = adminDao.findByNameAndPassword(name, MD5Encryption
                        .encrypt(password));
                return adminEntity!=null?new UserInfoVO(adminEntity):null;
        }
        return null;
    }
}
