---
title: Narzędzia linuxowe – podstawy programisty
url: narzędzia-linux-podstawy
id: 21
tags:
  - linux
  - shell
author: Damian Terlecki
date: 2020-01-12T20:00:00
---

Kiedy projekt przechodzi w fazę utrzymania, zwykle oznacza to, że system działa już w środowisku produkcyjnym, a główna faza rozwojowa została zakończona. W tym okresie, a zwłaszcza na wczesnych jego etapach, następuje zmiana kierunku z wprowadzaniu nowych funkcji na naprawę błędów i implementację przeoczonych przypadków brzegowych. Może to być efektem przepływów danych, które nie zostały w pełni zasymulowane podczas testowania (dane nieprodukcyjne). Przypadki takie mogą być trudne do odtworzenia, szczególnie gdy informacje pochodzące ze zgłoszenia o błędzie nie są wystarczająco szczegółowe.

Implementacja prawidłowego **logowania** wewnątrz aplikacji pozwala programistom na szybką identyfikację źródła problemów. Nawet w późniejszych fazach o wiele łatwiej jest zapewnić wsparcie biznesowe dla złożonych projektów, gdy integrowane są dodatkowe systemy. Aby jednak w pełni wykorzystać logi, niezwykle ważne jest posiadanie rozwiązania do ich indeksowania i przeszukiwania. Popularnym wyborem jest tutaj tzw. stos **ELK** (E – Elasticsearch, L – Logstash, K – Kibana). Ta kombinacja umożliwia agregowanie logów z różnych źródeł, przekształcanie ich do formatu JSON, wyszukiwanie, filtrowanie i wizualizację.

## Narzędzia uniksowe w systemie Windows

Czasami możemy nie mieć szczęścia, nie mając takiego rozwiązanie pod ręką, bądź sytuacja może wymagać **spojrzenia na surowe logi**. W takim przypadku wszystko, czego możesz potrzebować, to środowisko Linux lub tylko kilka podstawowych narzędzi, które udostępnia. Jeśli korzystasz z systemu Windows – nic straconego. Najprawdopodobniej masz już zainstalowany program Git. Podczas instalacji pojawiło się zapytanie o opcjonalną instalację narzędzi uniksowych. W przypadku pominięcia tej opcji – nadal możemy dokonać aktualizacji, uruchamiając najnowszą wersję instalatora bez żadnych negatywnych efektów.

<img src="/img/hq/git-unix-tools.png" alt="Instalacja narzędzi uniksowych z Gitem" title="Instalacja narzędzi uniksowych z Gitem">

Sam korzystam z trzeciej opcji, co jak mówi ostrzeżenie, może powodować inne zachowanie niż domyślne (Windowsowe) z powodu zastąpienia niektórych poleceń. W przypadku wykrycia problemu (od dłuższego czasu jeszcze mi się to nie przytrafiło) możesz po prostu usunąć je ze zmiennej środowiskowej *PATH*, ale jeśli nadal masz wątpliwości, możesz równie dobrze wybrać drugą opcję. Ja natomiast wolę trzecią opcję ze względu na znacznie lepsze narzędzie `sort`. Kolejną miłą rzeczą jest to, że powłoka Git Bash jest dostarczana wraz z programem SSH, więc nie musisz instalować dodatkowych klientów, takich jak PuTTY czy WinSCP.

Teraz powinniśmy być w stanie dostać się do Basha (jest w zmiennej środowiskowej *PATH*):

<img src="data:image/png;base64,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" alt="Uruchamianie Bash z paska adresu w Eksploratorze" title="Uruchamianie Bash z paska adresu w Eksploratorze"/>

<img src="data:image/png;base64,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" alt="Powłoka Git Bash w systemie Windows" title="Powłoka Git Bash w systemie Windows"/>

Jeśli na zdalnym komputerze działa system Linux, może pojawić się pokusa, aby pominąć tę instalację. Jednak w zależności od środowiska niektóre zadania, takie jak przetwarzanie danych, lepiej uruchomić na komputerze lokalnym, aby zmniejszyć zużycie zasobów serwerowych (miejsce na dysku, pamięć RAM i zużycie procesora).

## Przydatne narzędzia i polecenia

Korzystanie z poleceń i narzędzi przedstawionych poniżej może nie być trywialne w przypadku braku jakiejkolwiek uprzedniej interakcji ze środowiskiem Linuksowym, ale nie poddawaj się. Na dłuższą metę ich opanowanie znacznie zwiększy Twoją wydajność. Na razie przyjmijmy znajomość podstawowych poleceń (`ls`,` cd`, `pwd`) i oraz różnic między katalogiem domowym (`~/` lub `/home/user/`) a rootem (`/`). Bez zbędnych ceregieli:

<table class="rwd">
   <thead>
      <tr>
         <th>Polecenia</th>
         <th>Opis</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/ssh">ssh</a> user@hostname</code>
            <blockquote>The authenticity of host (...) can't be established.<br/>RSA key fingerprint is (...)<br/>Are you sure you want to continue connecting (yes/no)?</blockquote>
         </td>
         <td data-label="Opis">
            Przy pierwszym połączeniu ze zdalnym hostem może zostać wyświetlony monit o odcisk palca klucza RSA wraz z prośbą o potwierdzenie. <b>Idealnie</b> powinniśmy porównać odcisk z tym, który otrzymaliśmy z zaufanego źródła, aby upewnić się, że nie łączymy się z podstawionym hostem.</br></br>
            Następnie zostaniemy poproszeni o podanie hasła. Jeśli sytuacja wymaga automatycznego logowania (skrypt), potrzebować będziemy klucza SSH lub <a href="https://stackoverflow.com/a/43526842">dodatkowych narzędzi</a>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code>ssh -t user@hostname 'top -n 1 | head -n 5'</code>
            <code>ssh -t user@hostname 'top -n 1 | head -n 5 > top.log'</code>
            <code><a href="https://explainshell.com/explain?cmd=ssh+-t+user%40hostname+%22top+-n+1+%7C+head+-n+5%22+%3E+top.log">ssh -t user@hostname 'top -n 1 | head -n 5' > top.log</a></code>
         </td>
         <td data-label="Opis">
            Jest to podstawowy sposób na zdalne uruchomienie polecenia (zamiast otwierania powłoki) za pomocą SSH. Apostrofy służą do oznaczenia części, która będzie uruchamiana na serwerze. Zauważ <b>różnicę</b> między trzecim a drugim poleceniem, które spowoduje utworzenie pliku <b>lokalnie lub na serwerze</b>. Parametr <code>-t</code> został tu dodany, aby móc wywołać polecenie <code>top</code>, które jest programem ekranowym.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/scp">scp</a> /path/to/file user@hostname:/path/to/destination</code></br>
            <code>scp user@hostname:/path/to/file /path/to/destination</code>
         </td>
         <td data-label="Opis">
            Program SCP pozwala kopiować pliki na (pierwsze polecenie) i ze (drugie) zdalnego serwera. Zwróć uwagę, że <code>scp</code> <b>nadpisuje</b> pliki, jeśli mamy uprawnienia do zapisu.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/gzip">gzip</a></code><br/>
            przykład:</br>
            <code><a href="https://explainshell.com/explain?cmd=ssh+-t+user%40hostname+%27gzip+-c+large_logs.txt%27+%7C+gzip+-cd">ssh -t user@hostname 'gzip -c large_logs.txt' | gzip -cd</a></code>
         </td>
         <td data-label="Opis">
            Narzędzie do kompresji pliku z opcją wypisania go na standardowe wyjście <code>-c</code>. Opcja zalecana przed przesłaniem pliku przez SSH, w celu zmniejszenia transferu.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code>[<a href="https://linux.die.net/man/1/zcat" id="zcat">z</a>]<a href="https://linux.die.net/man/1/cat">cat</a></code>
         </td>
         <td data-label="Opis">
            Podstawowe polecenie do wyświetlenia zawartości pliku [plików] na standardowym wyjściu. Z prefiksem <code>z</code> wspiera pliki skompresowane (np. <code>zcat logs.gz</code>). Wraz z innymi poleceniami z prefiksem <i>z</i> może ono korzystać z katalogu <code>/tmp</code> do wykonania operacji, a podobnie jak inne polecenia obsługuje także <a href="#glob">wzorce glob</a>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code>[<a href="https://linux.die.net/man/1/zdiff">z</a>]<a href="https://linux.die.net/man/1/diff">diff</a></code>
         </td>
         <td data-label="Opis">
            Porównuje pliki linia po linii i wspiera wiele parametrów. Jeśli chcesz porównać linie niezależnie od ich kolejności w pliku lub obiekty JSON, to narzędzie może być niewystarczające. <a href="#awk">AWK</a> i <a href="#jq">Jq</a> będą tutaj bardziej pomocne.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code>[<a href="https://linux.die.net/man/1/zgrep">z</a>][e|f]<a href="https://linux.die.net/man/1/grep">grep</a></code><br/>
            przykład (zignoruj wielkość liter, dołącz 10 poprzedzających i 20 następujących wierszy):<br/>
            <code>zgrep -i -B 10 -A 20 'error' logs.gz</code>
         </td>
         <td data-label="Opis">
            Jest to prawdopodobnie <b>najpopularniejsze narzędzie</b> do przeszukiwania pliku w poszukiwaniu wzorca w linii. Różnice między odmianami Grep są subtelne:
            <ul>
               <li><code>fgrep</code>/<code>grep -F</code> – nie rozpoznaje wyrażeń REGEX;</li>
               <li><code>egrep</code>/<code>grep -E</code> – rozpoznaje i nie wymaga znaków ucieczki dla wyrażeń REGEX;</li>
               <li><code>grep</code> – rozpoznaje i wymaga znaków ucieczki dla wyrażeń REGEX.</li>
            </ul>
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code>[<a href="https://linux.die.net/man/1/zless" id="zless">z</a>]<a href="https://linux.die.net/man/1/less">less</a></code>
         </td>
         <td data-label="Opis">
            Podobnie do <code><a href="#zcat">[z]cat</a></code> – wyświetla zawartość pliku, ale w formacie mieszczącym się na ekranie. Program umożliwia przewijanie i udostępnia wiele dodatkowych poleceń. Jest przydatny do przeszukiwania w locie, np. zapytania na podstawie identyfikatora klienta, a następnie wyszukania powiązanej odpowiedzi nieznaną liczbę linii dalej. W przypadku wielu plików można to zrobić w następujący sposób:
            <ol>
               <li><code>zless 2020-01-0[1-9].log.gz</code>.</li>
               <li>Naciśnij <code>ESC</code>, wpisz <code>/fraza</code>, wciśnij <code>Enter</code>.</li>
               <li>Naciśnij <code>ESC</code>, a następnie <code>n</code> w celu ponowienia.</li>
            </ol>
         </td>
      </tr>
      <tr>
         <td data-label="Polecenia">
            <code>[z<a href="https://gist.github.com/brwnj/5536490">(1)</a><a href="http://lptms.u-psud.fr/wiki/index.php/Working_with_compressed_files">(2)</a>]<a href="https://linux.die.net/man/1/head">head</a></code><br/>
            <code>[z]<a href="https://linux.die.net/man/1/tail">tail</a></code>
         </td>
         <td data-label="Opis">
            Te dwa polecenia pokazują pierwsze/ostatnie <code>-n</code> linii pliku. Mogą się przydać do szybkiego sprawdzenia dat logów dla nienazwanych/łączonych plików.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/cut">cut</a></code><br/>
            przykłady (1. wypisze <i>b</i>, 2.: <i>b c</i>):<br/>
            <code>echo "a b c" | cut -d" " -f2</code><br/>
            <code>echo "a b c" | cut -d" " -f2-</code><br/>
         </td>
         <td data-label="Opis">
            Przydatne do wyodrębnienia wybranych kolumn przedzielonych określonym separatorem.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/tr">tr</a></code><br/>
            przykład zamieniający <i>abc</i> na <i>dbc</i>:<br/>
            <code>echo "abc" | tr a d</code><br/>
         </td>
         <td data-label="Opis">
            Narzędzie do zastępowania lub usuwania znaków <code>-d</code>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/sort">sort</a></code>
         </td>
         <td data-label="Opis">
            Podstawowe polecenie do sortowania linii. Obsługuje wiele przypadków, takich jak sortowanie słownikowe <code>-d</code> bądź numeryczne <code>-n</code>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/uniq">uniq</a></code>
         </td>
         <td data-label="Opis">
            Po uprzednim posortowaniu usuwa duplikaty, pozwala zliczać wystąpienia <code>-c</code> bądź wyświetlić tylko unikalne linie <code>-u</code>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/xargs">xargs</a></code><br/>
            przykład:
            <code><a href="https://explainshell.com/explain?cmd=find+%2Ftmp+-name+log+-type+f+-print+%7C+xargs+%2Fbin%2Frm+-f">find /tmp -name log -type f -print | xargs /bin/rm -f</a></code>
         </td>
         <td data-label="Opis">
            Pozwala na budowanie poleceń ze standardowego wejścia, co jest jednym ze sposobów automatyzacji sytuacji opisanej przy poleceniu <code><a href="#zless">zless</a></code>.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/split">split</a></code><br/>
         </td>
         <td data-label="Opis">
            Używane do dzielenia plików tekstowych na mniejsze na podstawie liczby wierszy <code>-l</code> lub rozmiaru <code>-b</code> (np. <code>split log.txt -b 200 MB</code>).
         </td>
      </tr>
      <tr>
         <td data-label="Polecenie">
            <code><a href="https://linux.die.net/man/1/sed">sed</a></code><br/>
            <code><a href="https://linux.die.net/man/1/awk" id="awk">awk</a></code><br/>
            <code><a href="https://stedolan.github.io/jq/" id="jq">jq</a></code>
         </td>
         <td data-label="Opis">
            Te trzy narzędzia są bardziej złożone i wykorzystywane są do przetwarzania danych dlatego, nie będę tutaj ich szczegółowo omawiał.<br/>
            <b>Sed</b> jest edytorrem strumieniowy, który udostępnia łatwy sposób przekształcania linii tekstowych – <code>sed 's/przed/po/g' log.txt</code> jest przykładowym zastąpieniem tekstowym.<br/>
            <b>Awk</b> to właściwie język skryptowy, który rozwiązuje podobne problemy, ale jest znacznie potężniejszy.<br/>
            <b>Jq</b> zwykle nie jest częścią dystrybucji Linuksa, ale najlepiej sprawdza się w przetwarzaniu plików JSON.
         </td>
      </tr>
      <tr>
         <td data-label="Polecenia">
            <ol>
               <li>
                  <code><a href="https://linux.die.net/man/1/nproc">nproc</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/top">top</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/du">du</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/free">free</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/ps">ps</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/vmstat">vmstat</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/iostat">iostat</a></code>
               </li>
               <li>
                  <code>ls <a href="https://linux.die.net/man/5/proc">/proc</a></code>
               </li>
               <li>
                  <code><a href="https://linux.die.net/man/1/kill">kill</a></code>
               </li>
            </ol>
         </td>
         <td data-label="Opis">
            Ostatnia grupa narzędzi, które mogą nie być tak przydatne dla programistów, ale są krytyczne dla <b>inżynierów wydajności</b> i <b>wsparcia</b>:
            <ol>
               <li>
                  Zwraca liczbę dostępnych jednostek przetwarzania – przydatne do zrównoleglania skryptów
               </li>
               <li>
                  Wyświetla użycie zasobów per proces. Naciśnij kilkakrotnie <code>e</code>, aby wybrać oczekiwaną skalę jednostki. Polecenie te pozwala nam sprawdzić, który proces pochłania większość naszych zasobów.
               </li>
               <li>
                  Podaje rozmiary katalogów, <code>-h</code> zmienia jednostki na format czytelny dla człowieka, <code>-a</code> dokłada również inne pliki oprócz katalogów.
               </li>
               <li>
                  Wyświetla wolną i używaną pamięć – za pomocą <code>-h</code> w formacie czytelnym dla człowieka. Jest to szybki sposób na sprawdzenie, czy nie zaczyna nam brakować pamięci.
               </li>
               <li>
                  Przedstawia zrzut aktualnie uruchomionych procesów, bardziej szczegółowy za pomocą parametrów <code>-aux</code>.
               </li>
               <li>
                  Zwraca statystyki pamięci wirtualnej (parametr <code>1</code> włącza ciągłe raportowanie), przydatne do rozpoczęcia analizy wydajności – wykrycia nadmiernego przełączania kontekstu lub zweryfikowania czasu spędzonego w przestrzeni użytkownika.
               </li>
               <li>
                  Pseudo-system plików, który zapewnia interfejs dla struktur danych jądra. Na tej podstawie plików w tym katalogu możemy wyświetlić przydatne informacje, takie jak <code>cat /proc/cpuinfo</code>.
               </li>
               <li>
                  Przydate polecene kończące proces (identyfikowanym przez id z <code>ps</code>) użycie parametru <code>-9 </code> powinno odbywać się w ostateczności, ponieważ nie daje ono czasu na poprawne zamknięcie procesowi.
               </li>
            </ol>
         </td>
      </tr>
   </tbody>
</table>

### Glob

W przypadku większości poleceń, które mogą mieć wiele plików jako danych wejściowych, możesz użyć [wzorców glob](https://pl.wikipedia.org/wiki/Glob_(programowanie)). Mogą wyglądać podobnie, ale nie myl ich z REGEX-em. Te wzorce używają wieloznaczników <code>*</code>, <code>?</code> i <code>[…]</code> ułatwiają nam nieco życie. Są przydatne w przypadku serwerów z wieloma węzłami, szczególnie gdy mamy zamontowany katalog współdzielony lub ogólnie, gdy chcemy po prostu przeszukiwać wiele plików.

### Potoki i przekierowania

Każdy program uruchamiany w powłoce może mieć 3 strumienie *STDIN*, *STDOUT* i *STDERR*. Następujące symbole pozwalają na:
- `>` przekierowanie wyjścia do pliku;
- `>>` dopisanie wyjścia do pliku;
- `<` ustawienie wejścia z pliku;
- `2>` przekierowanie błędów do pliku;
- `|` przekierowanie wyjścia do innego programu.

### Historia

Ostatnia wskazówka dla sytuacji, w których mamy wiele środowisk z różnymi aplikacjami i zapomnieliśmy danej komendy bądź lokalizacji katalogu, w którym przechowywane są logi. Zazwyczaj historia Basha jest zapisywana w pliku <code>~/.bash_history</code> i jest dostępna za pomocą polecenia <code>history</code>. Możesz ją sprawdzić pod kątem ostatnich poleceń i poszukać czegoś, co brzmi znajomo.

## Podsumowanie

Nauka narzędzi uniksowych na pewno nie pójdzie na marne. Liczba sytuacji, w których mogą się przydać, jest ogromna i obejmuje:
- wyciąganie szczegółów z logów na podstawie jakiegoś identyfikatora/błędu/daty;
- pobieranie logów ze zdalnego serwera w celu ich lokalnego przetworzenia do raportu;
- przetwarzanie danych do pożądanego formatu;
- porównywanie dwóch plików i weryfikacja zgodności;
- przygotowywanie prostych statystyk (np. liczby błędów per typ);
- szybkie przeszukiwanie skompresowanych plików bez konieczności ich rozpakowywania i dzielenia na mniejsze;
- wyświetlanie części pliku, który może być trudny do załadowania na raz w edytorze;
- agregowanie logów z różnych usług/węzłów/serwerów;
- radzenie sobie w środowiskach bez dostępu do zaawansowanych narzędzi.

Jeśli w swoich działaniach zauważysz, że powtarzasz niektóre sekwencje poleceń, może to być dobry moment na ich automatyzację bądź wyodrębnienie do jednego skryptu.