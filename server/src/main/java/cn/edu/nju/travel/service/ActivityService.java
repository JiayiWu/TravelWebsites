package cn.edu.nju.travel.service;

import cn.edu.nju.travel.form.ActivityForm;
import cn.edu.nju.travel.vo.ActivityInfoVO;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by yuhqqq on 2019/1/15.
 */
public interface ActivityService {

    int createActivity(Integer createId, String location, Long startTime,
                       Long endTime, Integer joinType,
                              String coverUrl, String description) throws Exception;

    ActivityInfoVO findActivityById(Integer id) throws Exception;

    boolean isCreator(Integer activityId, Integer userId) throws Exception;

    List<ActivityInfoVO> findAllById(List<Integer> idList) throws Exception;

    int updateActivityInfo(ActivityForm activityForm) throws Exception;

    List<ActivityInfoVO> getActivityList(Timestamp lastTimestamp, Integer size) throws Exception;
}
