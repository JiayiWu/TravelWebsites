package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.dao.RelationDao;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.service.RelationService;
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

    @Override
    public List<RelationEntity> findAllRelationByActivityId(Integer activityId) {
        Iterable<RelationEntity> relationEntityIterable = relationDao.findAllByActivityId(activityId);

        List<RelationEntity> relationEntityList = new ArrayList<>();
        relationEntityIterable.forEach(relationEntity -> relationEntityList.add(relationEntity));

        return relationEntityList;
    }

    @Override
    public List<RelationEntity> findAllRelationByUserID(Integer userId) {
        return null;
    }
}
