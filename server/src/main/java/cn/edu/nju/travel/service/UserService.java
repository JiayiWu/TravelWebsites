package cn.edu.nju.travel.service;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.vo.UserAuthVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import java.security.NoSuchAlgorithmException;
import java.util.List;

/**
 * Created on 2019/1/14
 */
public interface UserService {

    UserInfoVO register(String name, String mobile, String mail, String password, String logoUrl)
            throws Exception;

    UserInfoVO modifyInfo(int userId, String mobile, String mail, String logoUrl) throws Exception;

    void changePassword(int userId,String oldPassword, String newPassword) throws Exception;

    UserInfoVO login(String name, String password, RoleTypeCode code) throws Exception;

    UserInfoVO findUser(int id, RoleTypeCode type);

    UserInfoVO findById(Integer id) throws Exception;

    List<UserInfoVO> findAllById(List<Integer> idList) throws Exception;


    boolean isAdmin(int userId);



}
