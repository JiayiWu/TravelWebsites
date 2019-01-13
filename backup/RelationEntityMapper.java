package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.RelationEntity;

public interface RelationEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RelationEntity record);

    int insertSelective(RelationEntity record);

    RelationEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RelationEntity record);

    int updateByPrimaryKey(RelationEntity record);
}