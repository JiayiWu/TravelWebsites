package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.RelationEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/14
 */
public interface RelationDao extends PagingAndSortingRepository<RelationEntity, Integer>{

    Iterable<RelationEntity> findAllByActivityId(Integer activityId);
}
