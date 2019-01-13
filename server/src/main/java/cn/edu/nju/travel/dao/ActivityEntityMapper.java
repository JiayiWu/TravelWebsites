package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.ActivityEntity;

public interface ActivityEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ActivityEntity record);

    int insertSelective(ActivityEntity record);

    ActivityEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ActivityEntity record);

    int updateByPrimaryKeyWithBLOBs(ActivityEntity record);

    int updateByPrimaryKey(ActivityEntity record);
}