package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RelationEntity {
    private Integer id;

    private Integer activityId;

    private Integer userId;

    private Integer state;

    private Timestamp createTime;

    private Timestamp modifyTime;


}