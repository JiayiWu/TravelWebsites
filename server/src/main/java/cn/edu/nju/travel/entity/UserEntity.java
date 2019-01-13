package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class UserEntity {
    private Integer id;

    private String name;

    private String mobile;

    private String mail;

    private String password;

    private Integer state;

    private Timestamp createTime;

    private Timestamp modifyTime;

    private String logoUrl;


}