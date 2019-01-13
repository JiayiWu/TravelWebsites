package cn.edu.nju.travel.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ActivityEntity  {
    private Integer id;

    private Integer createId;

    private Timestamp createTime;

    private Timestamp modifyTime;

    private String location;

    private Timestamp startTime;

    private Timestamp endTime;

    private Integer state;

    private Integer joinType;

    private String coverUrl;

    private String description;


}