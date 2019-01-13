package cn.edu.nju.travel.form;

import lombok.Data;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class LoginForm {

    private String username;

    private String password;
    /**
     * {@link cn.edu.nju.travel.constant.RoleTypeCode}
     */
    private int type;
}
