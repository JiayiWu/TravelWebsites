package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AuditEntity;

public interface AuditEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AuditEntity record);

    int insertSelective(AuditEntity record);

    AuditEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AuditEntity record);

    int updateByPrimaryKey(AuditEntity record);
}