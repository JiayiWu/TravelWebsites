package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AuditEntity {
    private Integer id;

    private Integer activityId;

    private Integer activityCreateId;

    private Integer joinUserId;

    private Integer state;

    private Timestamp createTime;

    private Timestamp modifyTime;

    private String context;

}