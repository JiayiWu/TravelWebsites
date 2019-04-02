package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.CommentEntity;
import cn.edu.nju.travel.vo.CommentVO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on 2019/3/27
 */
public interface CommentDao extends JpaRepository<CommentEntity, Integer>{

    List<CommentEntity> findByReferIdAndType(int referId, int type);

    CommentEntity findByIdAndCreatorId(int id, int creatorId);
}
