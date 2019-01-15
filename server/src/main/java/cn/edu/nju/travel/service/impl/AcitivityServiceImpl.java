package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ActivityStateCode;
import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.JoinTypeCode;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.ActivityService;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.ActivityInfoVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuhqqq on 2019/1/15.
 */
@Service
public class AcitivityServiceImpl implements ActivityService{

    @Autowired
    ActivityDao activityDao;

    @Autowired
    UserDao userDao;

    @Autowired
    UserService userService;

    @Autowired
    RelationService relationService;

    @Override
    public int createActivity(Integer createId, String location, Long startTime, Long endTime, Integer joinType, String coverUrl, String description) {
        if(startTime == null){
            throw new ServerException(ResponseCode.Error,"开始时间不能为空");
        }
        //todo
        //检查creatorid是否是一个用户的id
        ActivityEntity entity = new ActivityEntity();
        entity.setCreateId(createId);
        entity.setLocation(location);
        entity.setStartTime(new Timestamp(startTime));
        entity.setEndTime(new Timestamp(endTime));
        entity.setState(ActivityStateCode.VALID.getIndex());
        entity.setJoinType(joinType);
        entity.setCoverUrl(coverUrl);
        entity.setDescription(description);
        activityDao.save(entity);
        return 1;
    }

    @Override
    public ActivityInfoVO findActivityById(Integer id) {
        ActivityEntity activityEntity = activityDao.findById(id).get();

        UserInfoVO creator = userService.findById(activityEntity.getCreateId());

        List<RelationEntity> relationEntityList = relationService.findAllRelationByActivityId(activityEntity.getId());

        List<Integer> attendIdList = new ArrayList<>();
        List<UserInfoVO> attendList;
        if(activityEntity.getJoinType().equals(JoinTypeCode.DIRECT.getIndex())){
            relationEntityList.forEach(relationEntity -> attendIdList.add(relationEntity.getUserId()));
        } else if (activityEntity.getJoinType().equals(JoinTypeCode.AUTH.getIndex())){
            for(RelationEntity relationEntity : relationEntityList){
                if(relationEntity.getState().equals(ApproveStateCode.ACCEPT.getIndex())){
                    attendIdList.add(relationEntity.getUserId());
                }
            }
        } else {
            throw new ServerException(ResponseCode.Error, "JoinType 错误");
        }

        if(attendIdList.size() > 0){
            attendList = userService.findAllById(attendIdList);
        } else {
            attendList = new ArrayList<>();
        }

        ActivityInfoVO activityInfoVO = new ActivityInfoVO();
        activityInfoVO.setLocation(activityEntity.getLocation());
        activityInfoVO.setDescription(activityEntity.getDescription());
        activityInfoVO.setCoverUrl(activityEntity.getCoverUrl());
        activityInfoVO.setEndTime(activityEntity.getEndTime().getTime());
        activityInfoVO.setStartTime(activityEntity.getStartTime().getTime());
        activityInfoVO.setId(activityEntity.getId());
        activityInfoVO.setJoinType(JoinTypeCode.values()[activityEntity.getJoinType()].getValue());
        activityInfoVO.setCreator(creator);
        activityInfoVO.setAttendList(attendList);

        return activityInfoVO;
    }
}
