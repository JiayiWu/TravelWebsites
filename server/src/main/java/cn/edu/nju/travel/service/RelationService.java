package cn.edu.nju.travel.service;

import cn.edu.nju.travel.entity.RelationEntity;

import java.util.List;

/**
 * Created by yuhqqq on 2019/1/16.
 */
public interface RelationService {

    /**
     * 根据活动id查找所有报名参加活动的人
     * 报名是否需要审核以及是否通过审核由调用者进行处理
     * @param activityId
     * @return
     */
    List<RelationEntity> findAllRelationByActivityId(Integer activityId);

    /**
     * 根据用户id查找此用户报名的所有活动
     * 包括审核未通过的、待审核的等
     * @param userId
     * @return
     */
    List<RelationEntity> findAllRelationByUserID(Integer userId);



}
