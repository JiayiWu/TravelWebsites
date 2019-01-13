package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AdminEntity {
    private Integer id;

    private String name;

    private String password;

    private Timestamp createTime;

    private Timestamp modifyTime;


}