package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ActivityStateCode;
import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.JoinTypeCode;
import cn.edu.nju.travel.constant.RelationStateCode;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.form.ActivityForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.ActivityService;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.ActivityInfoVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuhqqq on 2019/1/15.
 */
@Service
@Transactional
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
    public ActivityInfoVO findActivityById(Integer id) throws Exception{
        ActivityEntity activityEntity = activityDao.findById(id).get();

        ActivityInfoVO activityInfoVO = getActivityInfoVO(activityEntity);

        return activityInfoVO;
    }

    @Override
    public boolean isCreator(Integer activityId, Integer userId) throws Exception {

        ActivityEntity activityEntity = activityDao.findById(activityId).get();
        if (activityEntity.getCreateId().equals(userId)){
            return true;
        }
        return false;
    }

    @Override
    public List<ActivityInfoVO> findAllById(List<Integer> idList) throws Exception {
//        Iterable<ActivityEntity> activityEntityList = activityDao.findAllById(idList);
        return null;

    }

    @Override
    public int updateActivityInfo(ActivityForm activityForm) throws Exception {
        activityDao.updateActivityInfo(activityForm.getId(),activityForm.getLocation(),
                new Timestamp(activityForm.getStartTime()),
                new Timestamp(activityForm.getEndTime()),
                activityForm.getJoinType(), activityForm.getCoverUrl(), activityForm.getDescription());
        return 0;
    }

    @Override
    public List<ActivityInfoVO> getActivityList(Timestamp lastTimestamp, Integer size) throws Exception {
        List<ActivityEntity> activityEntityList = activityDao.getActivityList(lastTimestamp, size);

        List<ActivityInfoVO> activityInfoVOList = new ArrayList<>();
        for(ActivityEntity activityEntity : activityEntityList){
            activityInfoVOList.add(getActivityInfoVO(activityEntity));
        }
        return activityInfoVOList;
    }

    private ActivityInfoVO getActivityInfoVO(ActivityEntity activityEntity) throws Exception{
        UserInfoVO creator = userService.findById(activityEntity.getCreateId());

        List<RelationEntity> relationEntityList = relationService.findAllRelationByActivityId(activityEntity.getId());

        List<Integer> attendIdList = new ArrayList<>();
        List<UserInfoVO> attendList;
        if(activityEntity.getJoinType().equals(JoinTypeCode.DIRECT.getIndex())){
            relationEntityList.forEach(relationEntity -> attendIdList.add(relationEntity.getUserId()));
        } else if (activityEntity.getJoinType().equals(JoinTypeCode.AUTH.getIndex())){
            for(RelationEntity relationEntity : relationEntityList){
                if(relationEntity.getState().equals(RelationStateCode.VALID.getIndex())){
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
