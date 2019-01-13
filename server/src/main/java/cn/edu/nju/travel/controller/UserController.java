package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.AccountApproveForm;
import cn.edu.nju.travel.form.AttendActivityForm;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.form.UserForm;
import cn.edu.nju.travel.vo.StudentAuthInfo;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/user/")
public class UserController {

    @ApiOperation(value = "用户学生认证申请", response = SimpleResponse.class)
    @RequestMapping(value = "application/auth", method = RequestMethod.POST)
    public SimpleResponse authStudent(HttpSession httpSession, @RequestBody AccountApproveForm accountApproveForm){
        return null;
    }

    @ApiOperation(value = "更改自己的认证信息", response = SimpleResponse.class)
    @RequestMapping(value = "application/update", method = RequestMethod.POST)
    public SimpleResponse updateStudentAuthInfo(HttpSession httpSession, @RequestBody AccountApproveForm accountApproveForm){
        return null;
    }


    @ApiOperation(value = "获取当前认证信息", response = StudentAuthInfo.class)
    @RequestMapping(value = "application/info", method = RequestMethod.GET)
    public SimpleResponse getAuthInfo(HttpSession httpSession){
        return null;
    }


    @ApiOperation(value = "更新", response = SimpleResponse.class, notes = "对用户数据进行修改")
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public SimpleResponse update(HttpSession httpSession, @RequestBody UserForm userForm){
        return null;
    }
}
