package cn.edu.nju.travel.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;
import javax.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(name = "activity")
public class ActivityEntity  {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "create_id")
    private Integer createId;

    @Column(name = "title")
    private String title;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;

    @Column(name = "modify_time")
    @UpdateTimestamp
    private Timestamp modifyTime;

    @Column(name = "location")
    private String location;

    @Column(name = "start_time")
    @NotNull
    private Timestamp startTime;

    @Column(name = "end_time")
    @NotNull
    private Timestamp endTime;

    @Column(name = "state")
    private Integer state;

    @Column(name = "join_type")
    private Integer joinType;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "like_count")
    private int likeCounts;

    @Version
    private long version;



}