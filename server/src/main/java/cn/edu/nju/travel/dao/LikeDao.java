package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on 2019/3/27
 */
public interface LikeDao extends JpaRepository<LikeEntity, Long> {

    LikeEntity findByUserIdAndReferIdAndType(int userId, int referId, int type);
}
