package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AuthenticationEntity {

    private Integer id;

    private Integer userId;

    private Timestamp createTime;

    private Timestamp modifyTime;

    private Integer state;

    private String attachmentUrl;

    private String context;

}