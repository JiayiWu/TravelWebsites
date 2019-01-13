package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AuthenticationEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/14
 */
public interface AuthenticationDao extends PagingAndSortingRepository<AuthenticationEntity,
        Integer>{

}
