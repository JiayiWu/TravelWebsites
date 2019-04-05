package cn.edu.nju.travel.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

/**
 * Created on 2019/4/3
 */
@Table(name = "concern")
@Entity
@Data
public class ConcernEntity {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "concerned_user_id")
    private int concernedId;

}
