package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AdminEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/14
 */
public interface AdminDao extends PagingAndSortingRepository<AdminEntity, Integer>{

}
