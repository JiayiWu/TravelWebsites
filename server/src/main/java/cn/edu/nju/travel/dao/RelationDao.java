package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.RelationEntity;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/1/14
 */
public interface RelationDao extends PagingAndSortingRepository<RelationEntity, Integer>{

    Iterable<RelationEntity> findAllByActivityId(Integer activityId);

    //todo
    int updateStateDelete(@Param("activity_id") Integer activityId, @Param("join_user_id") Integer userId);
}
