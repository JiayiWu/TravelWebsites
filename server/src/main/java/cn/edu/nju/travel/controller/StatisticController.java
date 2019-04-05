package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.StatisticService;
import io.swagger.annotations.ApiOperation;
import javax.annotation.Resource;

import org.springframework.web.bind.annotation.*;

/**
 * Created on 2019/4/5
 */
@RestController
@RequestMapping("/statistic/")
public class StatisticController {

    @Resource
    StatisticService statisticService;

    @ApiOperation(value = "获取用户每月参加的活动数量", response = SimpleResponse.class, notes =
            "返回大小为12的数组，值即为index对应的月份的次数（从0开始）")
    @GetMapping("monthData/{userid}")
    public SimpleResponse getMonthData(@PathVariable("userid") int userId){
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        try{
            int[] data = statisticService.getMonthData(userId);
            System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return SimpleResponse.ok(data);
        }catch (Exception e){
            System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
            return SimpleResponse.exception(e);
        }
    }


}
