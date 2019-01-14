package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/14
 */
public interface UserDao extends PagingAndSortingRepository<UserEntity, Integer> {

    UserEntity findByName(String name);

    UserEntity findByNameAndPassword(String name, String password);
}
