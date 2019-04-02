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
 * Created on 2019/3/27
 */
@Data
@Entity
@Table(name = "comment")
public class CommentEntity {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "refer_id")
    private int referId;

    @Column(name = "type")
    private int type;

    @Column(name = "creator_id")
    private int creatorId;

    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "content")
    private String content;

    @Column(name = "create_time")
    @CreationTimestamp
    private Timestamp createTime;

}
