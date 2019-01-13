package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.vo.AuthenticationInfoListVO;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * 该审批用AuthenticationEntity表
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/admin/")
public class AdminController {

    @ApiOperation(value = "审批用户加入申请", response = SimpleResponse.class,notes = "需要校验当前登录用户是否有审批权限 0 新申请审批，还未处理 1 审批通过  2  审批拒绝")
    @RequestMapping(value = "application/check/{activityId}/user/{userId}/result/{result}", method = RequestMethod.POST)
    public SimpleResponse checkApplication(HttpSession httpSession, @PathVariable int activityId, @PathVariable int userId, @PathVariable int result){
        return null;
    }

    @ApiOperation(value = "审批列表", response = AuthenticationInfoListVO.class,notes = "state -1获取该用户可以看见的所有审批，0 查看待处审批 1 查看审批通过申请  2  查看审批拒绝的申请")
    @RequestMapping(value = "application/list/{state}", method = RequestMethod.GET)
    public SimpleResponse applicationList(HttpSession httpSession,@PathVariable int state){
        return null;
    }
}
