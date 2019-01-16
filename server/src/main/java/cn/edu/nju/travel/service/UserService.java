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

    void register(String name, String mobile, String mail, String password, String logoUrl)
            throws Exception;

    UserInfoVO modifyInfo(int userId, String mobile, String mail, String logoUrl);

    void changePassword(int userId, String password);

    UserInfoVO login(String name, String password, RoleTypeCode code) throws Exception;

    UserInfoVO findById(Integer id) throws Exception;

    List<UserInfoVO> findAllById(List<Integer> idList) throws Exception;

    UserAuthVO uploadAuthInfo(int userId, String attachUrl, String context) throws Exception;

    UserAuthVO getAuthInfo(int userId);

    List<UserAuthVO> getAuthInfoOnePage(Integer lastId, int pageSize, ApproveStateCode state);



}
