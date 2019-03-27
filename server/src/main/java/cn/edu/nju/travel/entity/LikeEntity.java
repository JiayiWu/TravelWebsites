package cn.edu.nju.travel.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Version;

/**
 * Created on 2019/3/27
 */
@Data
@Entity
@Table(name = "likes")
public class LikeEntity {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "refer_id")
    private int referId;

    @Column(name = "type")
    private int type;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;
}
