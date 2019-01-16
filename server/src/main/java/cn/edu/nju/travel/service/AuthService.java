package cn.edu.nju.travel.service;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.vo.UserAuthVO;
import java.util.List;

/**
 * Created on 2019/1/16
 */
public interface AuthService {

    UserAuthVO uploadAuthInfo(int userId, String attachUrl, String context) throws Exception;

    UserAuthVO getAuthInfo(int userId);

    List<UserAuthVO> getAuthInfoOnePageByState(int lastId, ApproveStateCode state);

    List<UserAuthVO> getAuthInfoOnePage(int lastId);

    UserAuthVO authUser(int userId, ApproveStateCode state);
}
