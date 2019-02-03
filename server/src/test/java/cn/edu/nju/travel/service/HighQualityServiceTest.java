package cn.edu.nju.travel.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class HighQualityServiceTest {



    //
    @Autowired
    HighQualityService highQualityService;

    //获取活动列表
    @Test
    public void testHighQuality() {
            highQualityService.HighQualityFunc();
    }
}