package cn.edu.nju.travel.form;

import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class UserForm {


    private String name;

    private String mobile;

    private String mail;

    private String password;

    private String logoUrl;
}
