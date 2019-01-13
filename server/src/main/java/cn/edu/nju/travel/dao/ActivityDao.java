package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.ActivityEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/13
 */
public interface ActivityDao extends PagingAndSortingRepository<ActivityEntity, Integer>{

}
