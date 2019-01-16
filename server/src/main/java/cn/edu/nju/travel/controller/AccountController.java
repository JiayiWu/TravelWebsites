package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.form.LoginForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.form.UserForm;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.vo.UserInfoVO;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/account/")
public class AccountController {

    @Autowired
    UserService userService;

    @ApiOperation(value = "登录校验", response = SimpleResponse.class, notes = "Type 0表示普通用户登录，1表示管理员角色登录")
    @PostMapping("login")
    public SimpleResponse login(HttpSession httpSession, @RequestBody  LoginForm loginForm){
        try{
            UserInfoVO userInfoVO = userService.login(loginForm.getUsername(),
                    loginForm.getPassword(), RoleTypeCode.getTypeByIndex(loginForm.getType()));
            httpSession.setAttribute("userId",userInfoVO.getId());
            httpSession.setAttribute("userType",userInfoVO.getType());
            httpSession.setAttribute("username",userInfoVO.getName());
            return SimpleResponse.ok(userInfoVO);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }

    @ApiOperation(value = "注册", response = SimpleResponse.class, notes = "只能对普通用户进行注册")
    @PostMapping("register")
    public SimpleResponse register(HttpSession httpSession, @RequestBody UserForm userForm){
        try{
            userService.register(userForm.getName(),
                    userForm.getMobile(),
                    userForm.getMail(),
                    userForm.getPassword(),
                    userForm.getLogoUrl());
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

        return new SimpleResponse(ResponseCode.OK);
    }

    @ApiOperation(value = "退出登录", response = SimpleResponse.class, notes = "用户退出登录")
    @PostMapping("logout")
    public SimpleResponse logout(HttpSession httpSession){
        httpSession.invalidate();
        return new SimpleResponse(ResponseCode.OK);
    }




}
