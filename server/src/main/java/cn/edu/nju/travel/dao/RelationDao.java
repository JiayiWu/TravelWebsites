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
    @Modifying
    @Query("UPDATE RelationEntity a SET a.state = 2 " +
            "where a.activityId = :activityId and a.userId = :userId " +
            "and a.state = 0")
    int updateStateDelete(@Param("activityId") Integer activityId, @Param("userId") Integer userId);

    @Modifying
    @Query("update RelationEntity a SET a.state = 0 " +
            "where a.activityId = :activityId and a.userId = :userId " +
            "and a.state = 1")
    int updateStateValid(@Param("activityId") Integer activityId, @Param("userId") Integer userId);
}
