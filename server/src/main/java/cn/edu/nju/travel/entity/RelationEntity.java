package cn.edu.nju.travel.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(name = "relation")
public class RelationEntity {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "activity_id")
    private int activityId;

    @Column(name = "user_id")
    private int userId;

    @Column
    private Integer state;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;

    @Column(name = "modify_time")
    @UpdateTimestamp
    private Timestamp modifyTime;


}