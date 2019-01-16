package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.RelationEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/1/14
 */
public interface RelationDao extends PagingAndSortingRepository<RelationEntity, Integer>{

    Iterable<RelationEntity> findAllByActivityId(Integer activityId);

    Iterable<RelationEntity> findAllByActivityIdAndUserId(Integer activityId, Integer userId);

    //todo
//    @Modifying
//    @Query("UPDATE ActivityEntity a SET a.state = 2 " +
//            "where a.activity_id = :activityId and a.join_user_id = :userId " +
//            "and a.state = 0")
//    int updateStateDelete(@Param("activity_id") Integer activityId, @Param("join_user_id") Integer userId);

//    @Modifying
//    @Query("update ActivityEntity a SET a.state = 0 " +
//            "where a.activity_id = :activityId and a.join_user_id = :userId " +
//            "and a.state = 1")
//    int updateStateValid(@Param("activity_id") Integer activityId, @Param("join_user_id") Integer userId);
}
