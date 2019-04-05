package cn.edu.nju.travel.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Created on 2019/4/5
 */
@Table(name = "blog")
@Entity
@Data
public class BlogEntity {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "content")
    private String content;

    @Column(name = "photos")
    private String photos;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;


}
