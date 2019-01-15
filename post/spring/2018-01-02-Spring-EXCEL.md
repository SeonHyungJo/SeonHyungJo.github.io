---
path: "/post/spring/excel"
author: "sseon"
date: "2018-01-02"
title: "스프링 엑셀 업로드 & 다운로드"
tags: ["spring", "excel"]
category: "post"
---

# **Spring_EXCEL(Upload&Download)**

엑셀 만만하게 봤다가 후회하는중....
<br>

뭐가 이리 잘 되어있는 곳을 찾기가 힘든지 내가 찾다 찾다 나에게 맞는 코드를 찾았다. 이 코드를 바탕으로 커스터마이즈를 하려고 한다.

<br>
<br>

## 엑셀 다운로드 하기(xls)

생소스?를 가져왔다. 정말 기본적인 코드로 jsp에 버튼을 만들고 누르면 정말 다운로드가 된다. 이를 토대로 커스터마이즈를 할 것이다.

- 불편해서 import는 뺐습니다.
- package도 뺐습니다.

<br>
<br>

### pom.xml 추가(수정 18-02-05)

```xml
  <!-- Excel Read/Write 를 위한 Dependency 추가 -->
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>3.11</version>
  </dependency>
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>3.11</version>
  </dependency>
```

<br>

```java

@Controller
public class ExcelCotroller{

@RequestMapping(value="/ExcelPoi.do")
  public void ExcelPoi(HttpServletResponse response, Model model) throws Exception {

      HSSFWorkbook objWorkBook = new HSSFWorkbook();
      HSSFSheet objSheet = null;
      HSSFRow objRow = null;
      HSSFCell objCell = null;       //셀 생성

        //제목 폰트
  HSSFFont font = objWorkBook.createFont();
  font.setFontHeightInPoints((short)9);
  font.setBoldweight((short)font.BOLDWEIGHT_BOLD);
  font.setFontName("맑은고딕");

  //제목 스타일에 폰트 적용, 정렬
  HSSFCellStyle styleHd = objWorkBook.createCellStyle();    //제목 스타일
  styleHd.setFont(font);
  styleHd.setAlignment(HSSFCellStyle.ALIGN_CENTER);
  styleHd.setVerticalAlignment (HSSFCellStyle.VERTICAL_CENTER);

  objSheet = objWorkBook.createSheet("첫번째 시트");     //워크시트 생성

  // 1행
  objRow = objSheet.createRow(0);
  objRow.setHeight ((short) 0x150);

  objCell = objRow.createCell(0);
  objCell.setCellValue("번호");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(1);
  objCell.setCellValue("이름");
  objCell.setCellStyle(styleHd);

  // 2행
  objRow = objSheet.createRow(1);
  objRow.setHeight ((short) 0x150);

  objCell = objRow.createCell(0);
  objCell.setCellValue("1");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(1);
  objCell.setCellValue("홍길동");
  objCell.setCellStyle(styleHd);


  response.setContentType("Application/Msexcel");
  response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode("테스트","UTF-8")+".xls");

  OutputStream fileOut  = response.getOutputStream();
  objWorkBook.write(fileOut);
  fileOut.close();

  response.getOutputStream().flush();
  response.getOutputStream().close();
}
}

```
<br>

[소스 출처](http://blog.daum.net/hepidaum/68)

<br>
<br>

### 추가 설정

- 일단 파일명을 내맘대로 하고 싶다.
- 내가 공부하면서 제일 짜증난건 자세히 jsp파일까지 올려주지 않은 것이다. 그래서 전 올립니다.

```java 
  //ExcelController 파라미터 추가
  //@RequestParam 어노테이션을 적용해서 넘어오는 파라미터를 바로 연결시켜준다. 대신 이름이 같아야한다.(아무 값을 넣지 않아도 출력이 되도록 설정)
  @RequestParam(defaultValue = "test") String fileName

  response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode("테스트","UTF-8")+".xls");
  //위의 코드를 아래로 변경
  response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode(fileName,"UTF-8")+".xls");

  //당연히 jsp파일에 text입력창과 버튼을 추가 했다.
  <form id="excelForm" name="excelForm" method="post" action="ExcelPoi.do">
    <input type="text" name="fileName" />
    <input type="submit" value="xls파일로 받기" />
  </form>
```

<br>

- 다시 눌러보니 제가 입력한 이름으로 파일이 다운로드 됩니다.

<br>
<br>

#### 워크북 생성(엑셀틀 생성)

```java 
  HSSFWorkbook objWorkBook = new HSSFWorkbook();
  HSSFSheet objSheet = null;
  HSSFRow objRow = null;
  HSSFCell objCell = null;
```

<br>

- 내가 이해한 이 소스
  1. `HSSFWorkbook objWorkBook = new HSSFWorkbook()` => 엑셀을 만든다.
  2. `HSSFSheet objSheet = null;` => 시트를 만든다.
  3. `HSSFRow objRow = null;` => 행을 만든다.
  4. `HSSFCell objCell = null;` => 셀을 만든다.
- 이렇게 엑셀은 크게 3개만 기억하려고 한다. **시트**, **행**, **셀** 열단위는 없다. 일단 여기선

<br>
<br>

#### 폰트 설정

```java 
  HSSFFont font = objWorkBook.createFont();
  //글자 크기 설정
  font.setFontHeightInPoints((short)16);
  //글자 굵게 하기
  font.setBoldweight((short)font.BOLDWEIGHT_BOLD);\
  //폰트 설정
  font.setFontName("맑은고딕");
```

<br>

- 위에 설명대로 하나의 폰트설정을 만들고 필요할때 마다 사용할 수 있다.
- 굵게, 기울게, 취소선, 글자색 등을 지정할 수 있다.

<br>
<br>

#### 셀스타일 지정

```java 
  //제목 스타일에 폰트 적용, 정렬
  HSSFCellStyle styleHd = objWorkBook.createCellStyle();//제목 스타일 생성
  //만들어 놓은 폰트 적용
  styleHd.setFont(font);
  //가운데 정렬 설정
  styleHd.setAlignment(HSSFCellStyle.ALIGN_CENTER);
  //수직 중앙 정렬 설정
  styleHd.setVerticalAlignment (HSSFCellStyle.VERTICAL_CENTER);
```

- **추가내용**
  - 셀의 너비가 지정을 해버리면 안이쁘게 다운로드는 되는 경우가 있다.
  - 행을 만들어 준 `objSheet.autoSizeColumn(index);`를 주어서 사이즈를 자동으로 설정할 수 있다.

<br>
<br>

#### 데이터 입력

```java 
  objSheet = objWorkBook.createSheet("시트이름"); //워크시트 생성
```

<br>

- 첫번째 시트의 이름을 지정해주고 있다.

<br>

```java
  // 1행 생성
  objRow = objSheet.createRow(0);
  // 행 높이 지정
  objRow.setHeight ((short) 0x150);

  //셀에 데이터 넣지
  objCell = objRow.createCell(0);
  objCell.setCellValue("번호");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(1);
  objCell.setCellValue("이름");
  objCell.setCellStyle(styleHd);
```  

<br>

- 아까 말한대로 행단위의 데이터를 입력하고 있다.
- 데이터를 가져와 for문을 돌리면 좋을거라 생각하고 있다.
- 1행은 거의 제목을 적으므로 제목에 맞는 스타일을 적용해주는 것이 좋다.

<br>

```java
  // 2행
  objRow = objSheet.createRow(1);
  objRow.setHeight ((short) 0x150);

  objCell = objRow.createCell(0);
  objCell.setCellValue("1");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(1);
  objCell.setCellValue("홍길동");
  objCell.setCellStyle(styleHd);
```  

<br>

- 이제 진짜 2행부터는 데이터를 삽입한다.
- for문을 돌리려면 여기서부터 하는 것이 좋다.

```java

  response.setContentType("Application/Msexcel");
  response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode(fileName,"UTF-8")+".xls");

  OutputStream fileOut  = response.getOutputStream();
  objWorkBook.write(fileOut);
  fileOut.close();

  response.getOutputStream().flush();
  response.getOutputStream().close();
```

<br>

- 제목을 설정하며 확장자 이름을 설정해 준수
- 다운로드를 할 수 있도록 지원하고 있다.

<br>
<br>

#### 추가(18-02-05)

- 셀 병합

```java
  objSheet.addMergedRegion(new Region(1,(short)1,1,(short)2));
```

<br>
<br>

## 엑셀 다운로드 하기(xlsx)

엑셀 버전은 xls, xlsx으로 2가지가 있다. 이에 따라 다르게 컨트롤러를 만들어야한다. 정말 변경하는 것은 쉽다.

<br>

- HSSF부분은 전부 XSSF로 바꿔주면 된다.

<br>

## 실제 데이터 가져와서 뿌리기

### 엑셀 다운로드 하기 코드 수정(xls)

- 통 소스입니다.
- DB에서 가져온 데이터는 사진으로 확인하겠습니다.

```java
  @RequestMapping(value = "/ExcelPoi.do")
  public void ExcelPoi(@RequestParam String fileName, HttpServletResponse response, Model model) throws Exception {

  HSSFWorkbook objWorkBook = new HSSFWorkbook();
  HSSFSheet objSheet = null;// 시트생성
  HSSFRow objRow = null;// 행 생성
  HSSFCell objCell = null;// 셀 생성

  HSSFFont font = objWorkBook.createFont();
  font.setFontHeightInPoints((short) 14);
  // 글자 굵게 하기
  font.setBoldweight((short) font.BOLDWEIGHT_BOLD);
  // 폰트 설정
  font.setFontName("맑은고딕");

  // 제목 스타일에 폰트 적용, 정렬
  HSSFCellStyle styleHd = objWorkBook.createCellStyle();// 제목 스타일
  // 폰트 설정
  styleHd.setFont(font);
  // 가운데 정렬
  styleHd.setAlignment(HSSFCellStyle.ALIGN_CENTER);
  styleHd.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

  objSheet = objWorkBook.createSheet("첫번째 시트"); // 워크시트 생성

  List<Map> rowList = excelService.selectRow();

  // 행으로 제작을 하네
  // 1행
  objRow = objSheet.createRow(0);
  objRow.setHeight((short) 0x150);

  objCell = objRow.createCell(0);
  objCell.setCellValue("아이디");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(1);
  objCell.setCellValue("이름");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(2);
  objCell.setCellValue("나이");
  objCell.setCellStyle(styleHd);

  objCell = objRow.createCell(3);
  objCell.setCellValue("이메일");
  objCell.setCellStyle(styleHd);

  int index = 1;
  for (Map map : rowList) {
    objRow = objSheet.createRow(index);
    objRow.setHeight((short) 0x150);

    objCell = objRow.createCell(0);
    objCell.setCellValue((String)map.get("custId"));
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(1);
    objCell.setCellValue((String)map.get("custName"));
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(2);
    objCell.setCellValue((String)map.get("custAge"));
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(3);
    objCell.setCellValue((String)map.get("custEmail"));
    objCell.setCellStyle(styleHd);
    index++;
  }

  for (int i = 0; i < rowList.size(); i++) {
    objSheet.autoSizeColumn(i);
  }

  response.setContentType("Application/Msexcel");
  response.setHeader("Content-Disposition", "ATTachment; Filename="
      + URLEncoder.encode(fileName, "UTF-8") + ".xls");

  OutputStream fileOut = response.getOutputStream();
  objWorkBook.write(fileOut);
  fileOut.close();

  response.getOutputStream().flush();
  response.getOutputStream().close();
}
```

<br>
<br>

### 엑셀 다운로드 하기 코드 수정(xlsx)

<br>

```java
  @RequestMapping(value = "/ExcelPoi2.do")
  public void ExcelPoi2(@RequestParam String fileName, HttpServletResponse response, Model model)
      throws Exception {

    XSSFWorkbook objWorkBook = new XSSFWorkbook();
    XSSFSheet objSheet = null;
    XSSFRow objRow = null;
    XSSFCell objCell = null; // 셀 생성

    // 제목 폰트
    XSSFFont font = objWorkBook.createFont();
    font.setFontHeightInPoints((short) 9);
    font.setBoldweight((short) font.BOLDWEIGHT_BOLD);
    font.setFontName("맑은고딕");

    // 제목 스타일에 폰트 적용, 정렬
    XSSFCellStyle styleHd = objWorkBook.createCellStyle(); // 제목 스타일
    styleHd.setFont(font);
    styleHd.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    styleHd.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

    objSheet = objWorkBook.createSheet("첫번째 시트"); // 워크시트 생성

    List<Map> rowList = excelService.selectRow();

    // 행으로 제작을 하네
    // 1행
    objRow = objSheet.createRow(0);
    objRow.setHeight((short) 0x150);

    objCell = objRow.createCell(0);
    objCell.setCellValue("아이디");
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(1);
    objCell.setCellValue("이름");
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(2);
    objCell.setCellValue("나이");
    objCell.setCellStyle(styleHd);

    objCell = objRow.createCell(3);
    objCell.setCellValue("이메일");
    objCell.setCellStyle(styleHd);

    int index = 1;
    for (Map map : rowList) {
      objRow = objSheet.createRow(index);
      objRow.setHeight((short) 0x150);

      objCell = objRow.createCell(0);
      objCell.setCellValue((String)map.get("custId"));
      objCell.setCellStyle(styleHd);

      objCell = objRow.createCell(1);
      objCell.setCellValue((String)map.get("custName"));
      objCell.setCellStyle(styleHd);

      objCell = objRow.createCell(2);
      objCell.setCellValue((String)map.get("custAge"));
      objCell.setCellStyle(styleHd);

      objCell = objRow.createCell(3);
      objCell.setCellValue((String)map.get("custEmail"));
      objCell.setCellStyle(styleHd);
      index++;
    }

    for (int i = 0; i < rowList.size(); i++) {
      objSheet.autoSizeColumn(i);
    }

    response.setContentType("Application/Msexcel");
    response.setHeader("Content-Disposition", "ATTachment; Filename="
        + URLEncoder.encode(fileName, "UTF-8") + ".xlsx");

    OutputStream fileOut = response.getOutputStream();
    objWorkBook.write(fileOut);
    fileOut.close();

    response.getOutputStream().flush();
    response.getOutputStream().close();
  }
```

<br>
<br>

## 엑셀 다운받기 결과

### jsp 출력창

![1](https://github.com/SeonHyungJo/My_Study/blob/master/Spring/img/excel1.JPG?raw=true)

<br>
<br>

### 2개의 확장자로 다운받기

![2](https://github.com/SeonHyungJo/My_Study/blob/master/Spring/img/excel2.JPG?raw=true)

<br>
<br>

### xls확장자 결과

![3](https://github.com/SeonHyungJo/My_Study/blob/master/Spring/img/excel3.JPG?raw=true)

<br>
<br>

### xlsx확장자 결과

![4](https://github.com/SeonHyungJo/My_Study/blob/master/Spring/img/excel4.JPG?raw=true)

<br>
<br>

## 엑셀 업로드(17-12-28)

연말 기념 엑셀 업로드 진행
여러 사이트를 다 둘러보다가 결국엔 하나 찾았다. 엑셀업로드에 관련된 여러 사이트가 있지만 하나씩 빠져있었는데 다 나와있는 곳을 찾았다. <br>
[[Spring] Excel 파일 업로드/ import / 엑셀업로드 / 첨부파일 / 엑셀 값 읽기 / Java](http://daydreamer-92.tistory.com/42)

<br>
<br>

### pom.xml 추가하기

```java
  <!-- Excel Read/Write 를 위한 Dependency 추가 -->
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>3.11</version>
  </dependency>
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>3.11</version>
  </dependency>

  <!-- 파일 업로드 -->
  <dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.2</version>
  </dependency>
```

<br>
<br>

### servlet 수정하기

```java
  <!-- 파일 업로드를 위한 bean추가 -->
  <!-- MultipartResolver -->
  <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <property name="maxUploadSize" value="100000000"/>
    <property name="maxInMemorySize" value="100000000"/>
  </bean>
```

### 엑셀 데이터를 가져오기 위한 4개의 파일 추가

#### 1. 확장자 구분

```java
  public class ExcelFileType {

  public static Workbook getWorkbook(String filePath) {

        FileInputStream fis = null;
        try {
            fis = new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e.getMessage(), e);
        }

        Workbook wb = null;

        if(filePath.toUpperCase().endsWith(".XLS")) {
            try {
                wb = new HSSFWorkbook(fis);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        }
        else if(filePath.toUpperCase().endsWith(".XLSX")) {
            try {
                wb = new XSSFWorkbook(fis);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        }

        return wb;

    }
  }
```
#### 2. 데이터 구분
```
  public class ExcelCellRef {
      /**
       * Cell에 해당하는 Column Name을 가젼온다(A,B,C..)
       * 만약 Cell이 Null이라면 int cellIndex의 값으로
       * Column Name을 가져온다.
       * @param cell
       * @param cellIndex
       * @return
       */
      public static String getName(Cell cell, int cellIndex) {
          int cellNum = 0;
          if(cell != null) {
              cellNum = cell.getColumnIndex();
          }
          else {
              cellNum = cellIndex;
          }

          return CellReference.convertNumToColString(cellNum);
      }

      public static String getValue(Cell cell) {
          String value = "";

          if(cell == null) {
              value = "";
          }
          else {
              if( cell.getCellType() == Cell.CELL_TYPE_FORMULA ) {
                  value = cell.getCellFormula();
              }
              else if( cell.getCellType() == Cell.CELL_TYPE_NUMERIC ) {
                  value = cell.getNumericCellValue() + "";
              }
              else if( cell.getCellType() == Cell.CELL_TYPE_STRING ) {
                  value = cell.getStringCellValue();
              }
              else if( cell.getCellType() == Cell.CELL_TYPE_BOOLEAN ) {
                  value = cell.getBooleanCellValue() + "";
              }
              else if( cell.getCellType() == Cell.CELL_TYPE_ERROR ) {
                  value = cell.getErrorCellValue() + "";
              }
              else if( cell.getCellType() == Cell.CELL_TYPE_BLANK ) {
                  value = "";
              }
              else {
                  value = cell.getStringCellValue();
              }
          }

          return value;
      }

  }

```

<br>
<br>

#### 3. 엑셀 읽어오기

```java
  public class ExcelRead {

  public static List<Map<String, String>> read(ExcelReadOption excelReadOption) {

    // 엑셀 파일 자체
    // 엑셀파일을 읽어 들인다.
    // FileType.getWorkbook() <-- 파일의 확장자에 따라서 적절하게 가져온다.
    Workbook wb = ExcelFileType.getWorkbook(excelReadOption.getFilePath());

    //	엑셀 파일에서 첫번째 시트를 가지고 온다.
    Sheet sheet = wb.getSheetAt(0);

    System.out.println("Sheet 이름: " + wb.getSheetName(0));
    System.out.println("데이터가 있는 Sheet의 수 :" + wb.getNumberOfSheets());

    // sheet에서 유효한(데이터가 있는) 행의 개수를 가져온다.
    int numOfRows = sheet.getPhysicalNumberOfRows();
    int numOfCells = 0;

    Row row = null;
    Cell cell = null;

    String cellName = "";
    /**
     * 각 row마다의 값을 저장할 맵 객체 저장되는 형식은 다음과 같다. put("A", "이름"); put("B",
     * "게임명");
     */
    Map<String, String> map = null;
    /*
     * 각 Row를 리스트에 담는다. 하나의 Row를 하나의 Map으로 표현되며 List에는 모든 Row가 포함될 것이다.
     */
    List<Map<String, String>> result = new ArrayList<Map<String, String>>();


    /**
     * 각 Row만큼 반복을 한다.
     */
    for (int rowIndex = excelReadOption.getStartRow() - 1; rowIndex < numOfRows; rowIndex++) {
      /*
       * 워크북에서 가져온 시트에서 rowIndex에 해당하는 Row를 가져온다. 하나의 Row는 여러개의 Cell을 가진다.
       */
      row = sheet.getRow(rowIndex);

      if (row != null) {
        /*
         * 가져온 Row의 Cell의 개수를 구한다.
         */
        numOfCells = row.getPhysicalNumberOfCells();
        /*
         * 데이터를 담을 맵 객체 초기화
         */
        map = new HashMap<String, String>();
        /*
         * cell의 수 만큼 반복한다.
         */
        for (int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
          /*
           * Row에서 CellIndex에 해당하는 Cell을 가져온다.
           */
          cell = row.getCell(cellIndex);
          /*
           * 현재 Cell의 이름을 가져온다 이름의 예 : A,B,C,D,......
           */
          cellName = ExcelCellRef.getName(cell, cellIndex);
          /*
           * 추출 대상 컬럼인지 확인한다 추출 대상 컬럼이 아니라면, for로 다시 올라간다
           */
          if (!excelReadOption.getOutputColumns().contains(cellName)) {
            continue;
          }
          /*
           * map객체의 Cell의 이름을 키(Key)로 데이터를 담는다.
           */
          map.put(cellName, ExcelCellRef.getValue(cell));
        }
        /*
         * 만들어진 Map객체를 List로 넣는다.
         */
        result.add(map);
      }
    }
    return result;
  }
  }

```

<br>
<br>

#### 4. 엑셀 읽어오기 옵션

```java
  public class ExcelReadOption {

  //	엑셀파일의 경로
    private String filePath;
    //  추출할 컬럼 명  
    private List<String> outputColumns;
    //  추출을 시작할 행 번호
    private int startRow;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public List<String> getOutputColumns() {

        List<String> temp = new ArrayList<String>();
        temp.addAll(outputColumns);

        return temp;
    }

    public void setOutputColumns(List<String> outputColumns) {

  //    	이걸 A,B,C,D 이런 식으로 추가하던데
        List<String> temp = new ArrayList<String>();
        temp.addAll(outputColumns);

        this.outputColumns = temp;
    }

    public void setOutputColumns(String ... outputColumns) {

        if(this.outputColumns == null) {
            this.outputColumns = new ArrayList<String>();
        }

        for(String ouputColumn : outputColumns) {
            this.outputColumns.add(ouputColumn);
        }
    }

    public int getStartRow() {
        return startRow;
    }
    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }
  }

```

<br>
<br>

### 컨트롤러 수정

```java
  ResponseBody
  @RequestMapping(value = "/excelUploadAjax.do", method = RequestMethod.POST)
  public ModelAndView excelUploadAjax(MultipartFile testFile, MultipartHttpServletRequest request)  throws Exception{

    System.out.println("업로드 진행");

    MultipartFile excelFile = request.getFile("excelFile");

    if(excelFile==null || excelFile.isEmpty()){

        throw new RuntimeException("엑셀파일을 선택 해 주세요.");
    }

    File destFile = new File("C:\\"+excelFile.getOriginalFilename());

    try{
      //내가 설정한 위치에 내가 올린 파일을 만들고
        excelFile.transferTo(destFile);

    }catch(Exception e){
        throw new RuntimeException(e.getMessage(),e);
    }

    //업로드를 진행하고 다시 지우기
    excelService.excelUpload(destFile);

    destFile.delete();
  //		FileUtils.delete(destFile.getAbsolutePath());

    ModelAndView view = new ModelAndView();

    view.setViewName("main/main.tiles");

      return view;
  }
```

<br>
<br>

### 서비스 임플 수정

```java
@Service("excelService")
public class ExcelServiceImpl implements ExcelService {

  @Resource(name = "excelMapper")
  private ExcelMapper excelMapper;

  @Override
  public List<Map> selectRow() throws Exception {

    return excelMapper.selectRow();
  }

  @Override
  public void excelUpload(File destFile) {

    ExcelReadOption excelReadOption = new ExcelReadOption();

//		파일경로 추가
        excelReadOption.setFilePath(destFile.getAbsolutePath());
//      추출할 컬럼 명 추가
        excelReadOption.setOutputColumns("A","B","C","D");
        // 시작 행
        excelReadOption.setStartRow(2);

        List<Map<String, String>>excelContent = ExcelRead.read(excelReadOption);

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("excelContent", excelContent);

        try {
      excelMapper.insertExcel(paramMap);
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }
}
```

<br>
<br>

### Mapper-SQL.xml 만들기

```java
  <insert id="insertExcel" parameterType="egovMap" >

    insert into INSERTEXCEL(
            id,
            name,
            age,
            email
        )values
    <foreach collection="excelContent" item="item" separator=",">
        (
            #{item.A},
            #{item.B},
            #{item.C},
            #{item.D}
        )
        </foreach>
  </insert>
```

<br>
<br>

### jsp 만들기

```java
  <form id="excelUploadForm" name="excelUploadForm" enctype="multipart/form-data"
    method="post" action= "excelUploadAjax.do">
    <div class="contents">
    <div>첨부파일은 한개만 등록 가능합니다.</div>

    <dl class="vm_name">
      <dt class="down w90">첨부 파일</dt>
        <dd><input id="excelFile" type="file" name="excelFile" /></dd>
      </dl>        
    </div>

    <div class="bottom">
      <button type="button" id="addExcelImpoartBtn" class="btn" onclick="check()" ><span>추가</span></button>
    </div>
  </form>
<script>

  function checkFileType(filePath) {
    var fileFormat = filePath.split(".");

    if (fileFormat.indexOf("xls") > -1 || fileFormat.indexOf("xlsx") > -1) {
      return true;
      } else {
      return false;
    }
  }

  function check() {

    var file = $("#excelFile").val();

    if (file == "" || file == null) {
    alert("파일을 선택해주세요.");

    return false;
    } else if (!checkFileType(file)) {
    alert("엑셀 파일만 업로드 가능합니다.");

    return false;
    }

    if (confirm("업로드 하시겠습니까?")) {

      var options = {

        success : function(data) {
          alert("모든 데이터가 업로드 되었습니다.");

        },
        type : "POST"
        };

      $("#excelUploadForm").ajaxSubmit(options);
    }
  }
</script>
```

<br>

나는 디비에 넣는 것까지 진행을 했다. 당연하게 디비에 테이블이 만들어져있어야하는 것이고, 위의 코드대로 진행을 하면 당연하게 데이터가 들어가게된다.
