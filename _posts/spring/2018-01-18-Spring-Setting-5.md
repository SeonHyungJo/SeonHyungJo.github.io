---
layout: post
title:  "스프링 혼자서 셋팅 해보기 5탄"
date:   2018-01-18
excerpt: "이제는 전자정부프레임워크에서 기본으로 제공하는 세팅을 보고 내가 커스터마이즈를 해보고 싶다."
tag:
- spring
- maven
- web
- setting
- Mybatis
comments: true

---

**Spring_Project_Setting_5**
===

이제 마이바티스까지 연결을 했으니 사용을 해야 하지 않나? 이제는 데이터를 가지고 가져와서 뿌려줘 보겠다. 다시 한 번말씀드리지만 저는 MySQL사용했습니다.

---

저는 좀 빠르게 많은 데이터를 가지고 진행해 보기 위해 데이터를 랜덤 값으로 만들어주는 사이트를 이용했습니다. [랜덤 데이터 생성](https://www.generatedata.com/)

## 테이블 생성

위에서 말한 사이트에서 입력만 잘해주면 테이블도 만들어주는 쿼리를 만듭니다. 대신 난장판이라 수정은 해주셔야합니다.

```
  CREATE TABLE `tb_board` (
  `IDX` mediumint unsigned NOT NULL auto_increment,
  `PARENT_IDX` mediumint default NULL,
  `TITLE` varchar(100) default NULL,
  `CONTENTS` varchar(4000) default NULL,
  `HIT_CNT` mediumint default NULL,
  `DEL_GB` varchar(1) default NULL,
  `CREA_DTM` date,
  PRIMARY KEY (`IDX`)
  ) AUTO_INCREMENT=1;
```

---

## 랜덤 데이터 생성

저는 간단하게 100개만 생성했습니다.

```
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (1,7,"Tanek","Marcia",8,"N","12/11/2018"),(2,7,"Preston","Whilemina",1,"N","01/31/2018"),(3,2,"Fitzgerald","Imani",7,"N","05/28/2018"),(4,9,"Abel","Ocean",7,"N","03/27/2017"),(5,8,"Ryder","Evangeline",2,"N","03/22/2018"),(6,7,"Solomon","Lani",9,"N","01/08/2019"),(7,1,"Oscar","Tanisha",2,"N","02/07/2017"),(8,1,"Quamar","Xantha",7,"N","12/12/2018"),(9,2,"Kane","Janna",8,"N","03/29/2017"),(10,7,"Mannix","Melodie",1,"N","07/30/2017");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (11,9,"Uriel","Hannah",9,"N","02/17/2017"),(12,8,"Dorian","Kiayada",7,"N","12/03/2018"),(13,9,"Abdul","Karyn",5,"N","08/26/2018"),(14,1,"Rafael","Rhoda",3,"N","04/30/2017"),(15,5,"Vance","Angelica",2,"N","07/21/2017"),(16,9,"Lucian","Tallulah",5,"N","05/18/2017"),(17,4,"Armando","Chiquita",3,"N","11/05/2017"),(18,8,"Cyrus","Brynne",8,"N","06/23/2018"),(19,4,"Colt","Chiquita",4,"N","01/08/2018"),(20,9,"Melvin","Leslie",4,"N","02/01/2018");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (21,8,"Lyle","Gay",3,"N","05/29/2017"),(22,3,"Zane","Gemma",3,"N","02/09/2017"),(23,8,"Griffin","Hadley",1,"N","01/27/2018"),(24,3,"Ulysses","Medge",9,"N","02/06/2017"),(25,4,"Fulton","Guinevere",3,"N","07/26/2017"),(26,4,"Edward","Pandora",5,"N","08/18/2018"),(27,8,"Phillip","Jessamine",7,"N","09/24/2017"),(28,3,"Benedict","Doris",10,"N","09/24/2018"),(29,3,"Steven","Aileen",7,"N","08/22/2018"),(30,5,"Carter","Tana",7,"N","08/31/2018");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (31,2,"Nero","Bertha",1,"N","06/27/2017"),(32,6,"Magee","Kristen",6,"N","09/06/2018"),(33,5,"Xanthus","Maya",10,"N","09/09/2017"),(34,4,"Dalton","Kiona",3,"N","06/11/2018"),(35,4,"Dorian","Maya",2,"N","04/05/2017"),(36,9,"Hilel","Selma",1,"N","03/28/2017"),(37,3,"Wallace","Remedios",3,"N","09/26/2018"),(38,9,"Marshall","Savannah",6,"N","08/28/2017"),(39,6,"Deacon","Tatum",7,"N","08/11/2017"),(40,9,"Kelly","Yael",2,"N","09/17/2017");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (41,8,"Gannon","Daphne",3,"N","03/10/2017"),(42,2,"Lucian","Liberty",1,"N","01/10/2019"),(43,5,"Davis","Aline",4,"N","09/17/2017"),(44,4,"Andrew","Kitra",1,"N","11/07/2017"),(45,4,"Stone","Jade",9,"N","01/09/2018"),(46,10,"Lev","Brenna",2,"N","03/28/2017"),(47,3,"Mason","Hermione",1,"N","04/23/2018"),(48,7,"Hasad","Miranda",2,"N","06/20/2018"),(49,5,"Lionel","Hollee",3,"N","09/26/2017"),(50,9,"Zachary","Irene",10,"N","07/16/2017");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (51,5,"Dennis","Alexandra",7,"N","07/07/2018"),(52,5,"Owen","Kyra",8,"N","08/12/2017"),(53,9,"Ashton","Alexa",3,"N","10/21/2017"),(54,8,"Judah","Miranda",1,"N","02/04/2018"),(55,8,"Deacon","Xerxes",9,"N","11/26/2018"),(56,5,"Sylvester","Hedy",3,"N","07/05/2017"),(57,2,"Jordan","Naomi",5,"N","11/03/2018"),(58,7,"Merrill","Selma",4,"N","04/14/2017"),(59,7,"Galvin","Tanya",10,"N","06/12/2018"),(60,2,"Aladdin","Karleigh",9,"N","01/17/2019");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (61,7,"Clayton","Ignacia",6,"N","11/23/2018"),(62,1,"Logan","Ifeoma",1,"N","06/18/2017"),(63,7,"Prescott","Kyra",10,"N","03/23/2017"),(64,5,"Abel","Hollee",6,"N","11/25/2018"),(65,8,"Caldwell","Eden",2,"N","07/26/2018"),(66,1,"Joshua","Marah",6,"N","03/04/2017"),(67,9,"Herrod","Ainsley",7,"N","04/02/2017"),(68,10,"Cameron","Petra",6,"N","04/18/2017"),(69,3,"Kenyon","Veda",9,"N","04/03/2017"),(70,3,"Graiden","Katelyn",5,"N","01/12/2018");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (71,1,"Grady","Zelenia",10,"N","08/06/2018"),(72,1,"Finn","Madeson",2,"N","03/24/2017"),(73,10,"Paul","Debra",2,"N","10/01/2017"),(74,4,"Galvin","Laurel",9,"N","06/20/2017"),(75,3,"Merrill","Tatiana",8,"N","12/31/2017"),(76,3,"Felix","Illana",4,"N","03/19/2017"),(77,5,"Emery","Eliana",3,"N","07/28/2018"),(78,7,"Hedley","Carissa",7,"N","03/08/2017"),(79,7,"Herman","Tasha",5,"N","07/23/2017"),(80,5,"Francis","Kirestin",2,"N","07/25/2018");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (81,10,"Kennedy","Naida",6,"N","06/07/2018"),(82,7,"Jelani","Heidi",6,"N","08/31/2017"),(83,10,"Coby","Hilary",8,"N","10/30/2017"),(84,10,"Leo","Alika",4,"N","07/31/2018"),(85,8,"Jason","Irene",6,"N","03/26/2018"),(86,6,"Emerson","Natalie",5,"N","10/29/2018"),(87,4,"Cameron","Cynthia",6,"N","01/17/2019"),(88,6,"Nehru","Nola",3,"N","02/20/2018"),(89,9,"Keith","Kelsie",8,"N","06/07/2017"),(90,9,"Fulton","Zorita",7,"N","04/15/2017");
  INSERT INTO `tb_board` (`IDX`,`PARENT_IDX`,`TITLE`,`CONTENTS`,`HIT_CNT`,`DEL_GB`,`CREA_DTM`) VALUES (91,2,"Avram","Bryar",4,"N","05/13/2017"),(92,7,"Graham","Bertha",5,"N","07/20/2018"),(93,3,"Ralph","Melyssa",8,"N","06/03/2017"),(94,3,"Aladdin","Ainsley",2,"N","12/09/2017"),(95,5,"Stewart","Camilla",6,"N","04/03/2018"),(96,2,"Yasir","Freya",4,"N","03/26/2017"),(97,4,"Justin","Fallon",5,"N","02/10/2018"),(98,6,"Allistair","Lisandra",4,"N","11/03/2018"),(99,7,"Merritt","Vielka",9,"N","02/07/2017"),(100,2,"Tyler","Wynne",9,"N","08/15/2017");
```

## MVC패턴을 위한 파일들 생성

  - mvc을 진행하기 위해 controller, service, serviceImpl, DAO파일을 생성합니다.
  - 저는 컨트롤러에서 메인으로 연결해서 사용했습니다.

```
  @Controller
  public class MainController {

  @Resource(name="mainService")
    private MainService mainService;

  Logger log = Logger.getLogger(this.getClass());

    @RequestMapping(value="/main.do")
    public ModelAndView mainController(Map<String,Object> commandMap) throws Exception{

      ModelAndView mv = new ModelAndView("main");
        log.debug("인터셉터 테스트");

        List<Map<String,Object>> list = mainService.selectBoardList(commandMap);
        mv.addObject("list", list);

        return mv;
    }
  }
```

---

  - 서비스는 인터페이스입니다.

```
  public interface MainService {

  	List<Map<String, Object>> selectBoardList(Map<String, Object> commandMap) throws Exception;

  }
```

---

  - 서비스임플은 말그래도 서비스를 임플해서 사용합니다.
```
  @Service("mainService")
  public class MainServiceImpl implements MainService{

  	Logger log = Logger.getLogger(this.getClass());

      @Resource(name="mainDAO")
      private MainDAO mainDAO;

  	@Override
  	public List<Map<String, Object>> selectBoardList(
  			Map<String, Object> commandMap) throws Exception {

  		return mainDAO.selectBoardList(commandMap);
  	}
  }
```

---

  - \_SQL.xml과 연결할 mapper입니다.
```
  @Repository("mainDAO")
  public class MainDAO extends AbstractDAO{

  	//DAO는 데이터베이스에 접근하여 데이터를 조작하는 (가져오거나 입력하는 등) 역할만 수행한다.
  	//selectList 메서드의 인자는 두가지이다. 첫번째는 쿼리 이름, 두번째는 쿼리가 실행되는데 필요한 변수들이다.
  	@SuppressWarnings("unchecked")
      public List<Map<String, Object>> selectBoardList(Map<String, Object> map) throws Exception{

          return (List<Map<String, Object>>)selectList("mainList.selectBoardList", map);
      }
  }
```

---

## SQL문 작성

  - 이제 sql.xml까지 연결을 했으니 SQL문을 작성해봅시다.
  - `resource > mapper > Main_SQL.xml`을 만들었습니다.

```
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">


  <!-- 프로젝트에서는 기본적으로 여러개의 <mapper>를 가지기 때문에 중복되는 이름을 가진 SQL이 존재할 수 있다.
  따라서 각 <mapper>마다 namespace 속성을 이용하여 <mapper>간 유일성을 보장해야 한다.
  여기서는 sample이라는 이름의 namespace를 사용하였다.-->
  <mapper namespace="mainList">

  <select id="selectBoardList" parameterType="hashmap" resultType="hashmap">
      <![CDATA[
    SELECT
        IDX,
        TITLE,
        HIT_CNT,
        CREA_DTM
    FROM
        TB_BOARD
    WHERE
        DEL_GB = 'N'
    ORDER BY IDX DESC
    ]]>
  </select>
  </mapper>
```

---

## jsp화면 초기화

  - 마지막으로 가져온 데이터를 뿌려줄 jsp파일 입니다.
  - jstl을 사용하여 뿌렸습니다.

```
  <%@ page language="java" contentType="text/html; charset=UTF-8"
  	pageEncoding="UTF-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

  <!DOCTYPE html>
  <html>
  <head>
  <title>first</title>

  </head>
  <body>
  	<h2>게시판 목록</h2>
  	<table style="border: 1px solid #ccc">
  		<colgroup>
  			<col width="10%" />
  			<col width="*" />
  			<col width="15%" />
  			<col width="20%" />
  		</colgroup>
  		<thead>
  			<tr>
  				<th scope="col">글번호</th>
  				<th scope="col">제목</th>
  				<th scope="col">조회수</th>
  				<th scope="col">작성일</th>
  			</tr>
  		</thead>
  		<tbody>
  			<c:choose>
  				<c:when test="${fn:length(list) > 0}">
  					<c:forEach items="${list }" var="row">
  						<tr>
  							<td>${row.IDX }</td>
  							<td>${row.TITLE }</td>
  							<td>${row.HIT_CNT }</td>
  							<td>${row.CREA_DTM }</td>
  						</tr>
  					</c:forEach>
  				</c:when>
  				<c:otherwise>
  					<tr>
  						<td colspan="4">조회된 결과가 없습니다.</td>
  					</tr>
  				</c:otherwise>
  			</c:choose>

  		</tbody>
  	</table>
  </body>
  </html>
```

---

# 끝

# 참고
 - [흔한 개발자의  개발 노트](http://addio3305.tistory.com/43?category=772645)
