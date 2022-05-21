Attribute VB_Name = "Module1"
Sub 生成マクロ()
Attribute 生成マクロ.VB_ProcData.VB_Invoke_Func = " \n14"
'
' 生成マクロ Macro
'

Application.ScreenUpdating = False
'変数の格納
Dim jp_head As String
Dim en_head As String
Dim jp_temp As String
Dim en_temp As String
Dim attack As String
Dim jp_name As String
Dim en_name As String
Dim jp_position As String
Dim en_position As String
Dim jp_message As String
Dim en_message As String
Dim url As String
Dim head As Integer
Dim maxRow As Integer

Worksheets("作成用シート").Select
jp_head = Range("F1").Value
en_head = Range("F2").Value
jp_temp = Range("F3").Value
en_temp = Range("F4").Value
attack = Range("F5").Value

jp_name = Range("J1").Value
en_name = Range("J2").Value
jp_position = Range("J3").Value
en_position = Range("J4").Value
jp_message = Range("J5").Value
en_message = Range("J6").Value
url = Range("J7").Value
head = Range("J8").Value


' 生成先シートの作成
    With Worksheets.Add()
        .Name = "HTML_日本語"
    End With
    With Worksheets.Add()
        .Name = "HTML_英語"
    End With
' ヘッダーのコピー
Worksheets(jp_head).Select
Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_日本語").Range("A1")
Worksheets(en_head).Select
Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_英語").Range("A1")

' 件数の取得
Worksheets(attack).Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

Dim i
'件数分繰り返す
For i = head To maxRow
'テンプレートのコピー/置換（日本語）
    Worksheets(jp_temp).Select
    Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_日本語").Range("A" & Worksheets("HTML_日本語").Cells(Rows.Count, 1).End(xlUp).Row + 1)
    Worksheets("HTML_日本語").Select
    '名前
    Cells.Replace What:="$名前（日本語）", Replacement:=Worksheets(attack).Range(jp_name & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '肩書
    Cells.Replace What:="$肩書（日本語）", Replacement:=Worksheets(attack).Range(jp_position & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    'メッセージ
    Range("A" & Range("A:A").Find("$メッセージ（日本語）").Row).Value = Worksheets(attack).Range(jp_message & i)
    '画像URL
    Cells.Replace What:="$URL", Replacement:=Worksheets(attack).Range(url & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False

'テンプレートのコピー/置換（英語）
    Worksheets(en_temp).Select
    Range(Range("A1"), Cells(Rows.Count, 1).End(xlUp)).Copy Worksheets("HTML_英語").Range("A" & Worksheets("HTML_英語").Cells(Rows.Count, 1).End(xlUp).Row + 1)
    Worksheets("HTML_英語").Select
    '名前
    Cells.Replace What:="$名前（英語）", Replacement:=Worksheets(attack).Range(en_name & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    '肩書
    Cells.Replace What:="$肩書（英語）", Replacement:=Worksheets(attack).Range(en_position & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False
    'メッセージ
    Range("A" & Range("A:A").Find("$メッセージ（英語）").Row).Value = Worksheets(attack).Range(en_message & i)
    '画像URL
    Cells.Replace What:="$URL", Replacement:=Worksheets(attack).Range(url & i), LookAt:=xlPart, _
        SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
        ReplaceFormat:=False


Next
    
'SQLの作成
Dim sql As String

Worksheets("作成用シート").Select
sql = "INSERT INTO " & Range("J12").Value & "posts(`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES" & _
    "(1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'[:ja]"

Worksheets("HTML_日本語").Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

For i = 1 To maxRow
    sql = sql & Replace(Replace(Range("A" & i).Value, vbLf, "\r\n"), "'", "''") & "\r\n"
    
Next

'英語
sql = sql & "[:en]"
Worksheets("HTML_英語").Select
maxRow = Cells(Rows.Count, 1).End(xlUp).Row

For i = 1 To maxRow
    sql = sql & Replace(Replace(Range("A" & i).Value, vbLf, "\r\n"), "'", "''") & "\r\n"
    
Next

Worksheets("作成用シート").Select
'タイトル
sql = sql & "','[:ja]" & Range("J13").Value & "[:en]" & Range("J14").Value & "',"

'その他は固定値で入れる
sql = sql & "'', 'publish', 'closed', 'closed', '', 'message', '', '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', 0, '', 0, 'page', '', 0)"

'出力
Range("B18").Value = sql

Application.ScreenUpdating = True
End Sub
