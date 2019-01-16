package cn.edu.nju.travel.service;

import cn.edu.nju.travel.vo.ActivityInfoVO;

import java.sql.Timestamp;

/**
 * Created by yuhqqq on 2019/1/15.
 */
public interface ActivityService {

    int createActivity(Integer createId, String location, Long startTime,
                       Long endTime, Integer joinType,
                              String coverUrl, String description) throws Exception;

    ActivityInfoVO findActivityById(Integer id) throws Exception;
}
