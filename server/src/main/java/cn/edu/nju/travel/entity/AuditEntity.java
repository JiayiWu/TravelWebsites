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
@Table(name = "audit")
public class AuditEntity {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "activity_id")
    private int activityId;

    @Column(name = "activity_create_id")
    private int activityCreateId;

    @Column(name = "join_user_id")
    private int joinUserId;

    @Column(name = "state")
    private int state;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;

    @Column(name = "modify_time")
    @UpdateTimestamp
    private Timestamp modifyTime;

    @Column(name = "context")
    private String context;

}