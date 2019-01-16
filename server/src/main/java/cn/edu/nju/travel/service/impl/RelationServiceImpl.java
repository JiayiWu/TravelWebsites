package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.JoinTypeCode;
import cn.edu.nju.travel.constant.RelationStateCode;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.AuditDao;
import cn.edu.nju.travel.dao.RelationDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.AuditEntity;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.utils.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by yuhqqq on 2019/1/16.
 */
@Service
public class RelationServiceImpl implements RelationService {

    @Autowired
    RelationDao relationDao;

    @Autowired
    ActivityDao activityDao;

    @Autowired
    AuditDao auditDao;

    @Override
    public List<RelationEntity> findAllRelationByActivityId(Integer activityId) throws Exception{
        Iterable<RelationEntity> relationEntityIterable = relationDao.findAllByActivityId(activityId);

        List<RelationEntity> relationEntityList = new ArrayList<>();
        relationEntityIterable.forEach(relationEntity -> relationEntityList.add(relationEntity));

        return relationEntityList;
    }

    @Override
    public List<RelationEntity> findAllRelationByUserID(Integer userId) {
        return null;
    }

    @Override
    public int attendActivity(Integer activityId, Integer userId, String attachmentUrl, String context) throws Exception {
        ActivityEntity activityEntity = activityDao.findById(activityId).get();
        if(activityEntity == null){
            throw new ServerException(ResponseCode.Error,"没有这项活动");
        }
        RelationEntity relationEntity = new RelationEntity();
        relationEntity.setActivityId(activityId);
        relationEntity.setUserId(userId);
        if(activityEntity.getJoinType().equals(JoinTypeCode.DIRECT.getIndex())){
            relationEntity.setState(RelationStateCode.VALID.getIndex());
            relationDao.save(relationEntity);
        }else if(activityEntity.getJoinType().equals(JoinTypeCode.AUTH.getIndex())){
            relationEntity.setState(RelationStateCode.INVALID
                    .getIndex());
            AuditEntity auditEntity = new AuditEntity();
            auditEntity.setActivityId(activityId);
            auditEntity.setActivityCreateId(activityEntity.getCreateId());
            auditEntity.setJoinUserId(userId);
            auditEntity.setState(ApproveStateCode.NEW.getIndex());
            auditEntity.setContext(context);
            auditDao.save(auditEntity);
            relationDao.save(relationEntity);
        }else {
            throw new ServerException(ResponseCode.Error, "错误的JoinType");
        }


        return 0;
    }

    @Override
    public int quitActivity(Integer activityId, Integer user) throws Exception {

        return 0;
    }
}
