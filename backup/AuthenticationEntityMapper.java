package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AuthenticationEntity;

public interface AuthenticationEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AuthenticationEntity record);

    int insertSelective(AuthenticationEntity record);

    AuthenticationEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AuthenticationEntity record);

    int updateByPrimaryKeyWithBLOBs(AuthenticationEntity record);

    int updateByPrimaryKey(AuthenticationEntity record);
}