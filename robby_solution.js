function getCommands(field, power) {
    var solutions = [];
    var n = Math.sqrt(field.length);
    var sti = 0,
        stj = 0,
        endi = 0,
        endj = 0;

    // We get the coordinates of start and end point
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (field[i * n + j] == 'S') {
                sti = i;
                stj = j;
            }
            if (field[i * n + j] == 'T') {
                endi = i;
                endj = j;
            }
        }
    }

    // We find all solutions using a while loop and a queue
    // d means pointer direction 
    var counter = 0;
    var queue = [{
        i: sti,
        j: stj,
        d: 'n',
        p: power,
        path: [],
        visited: [
            [sti, stj].toString()
        ]
    }];
    while (queue.length > 0) {
        counter++;
        let s = queue.shift();
        // console.log(counter);
        // console.log('EXTRACCION')
        // console.log(s);
        let i = s.i,
            j = s.j,
            d = s.d,
            p = s.p,
            path = s.path,
            visited = s.visited;
        if (i == endi && j == endj) {
            if (path.length <= power) {
                solutions.push(path);
            } else {
                continue;
            }
        }
        if (i < 0 || i >= n || j < 0 || j >= n || field[i * n + j] == '#' || p == 0) {
            // console.log('We crash an obstacle!');
            continue;
        }
        if (d == 'n') {
            // case: pointer is pointing to the north
            let temp = [...path];
            let v = [...visited];
            if (j + 1 < n && v.indexOf([i, j + 1].toString()) == -1) {
                temp.push('r');
                queue.push({
                    i: i,
                    j: j,
                    d: 'e',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = path.slice();
            if (j - 1 >= 0 && v.indexOf([i, j - 1].toString()) == -1) {
                temp.push('l');
                queue.push({
                    i: i,
                    j: j,
                    d: 'w',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = path.slice();
            if (v.indexOf([i - 1, j].toString()) == -1) {
                temp.push('f');
                let vcopy = [...v];
                vcopy.push([i - 1, j].toString());
                queue.push({
                    i: i - 1,
                    j: j,
                    d: 'n',
                    p: p - 1,
                    path: temp,
                    visited: vcopy
                });
            }
            // console.log(JSON.stringify(queue));
        } else if (d == 's') {
            // case: pointer is pointing to the south
            let temp = [...path];
            let v = [...visited];
            if (j + 1 < n && v.indexOf([i, j + 1].toString()) == -1) {
                temp.push('r');
                queue.push({
                    i: i,
                    j: j,
                    d: 'w',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (j - 1 >= 0 && v.indexOf([i, j - 1].toString()) == -1) {
                temp.push('l');
                queue.push({
                    i: i,
                    j: j,
                    d: 'e',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (v.indexOf([i + 1, j].toString()) == -1) {
                temp.push('f');
                let vcopy = [...v];
                vcopy.push([i + 1, j].toString());
                queue.push({
                    i: i + 1,
                    j: j,
                    d: 's',
                    p: p - 1,
                    path: temp,
                    visited: vcopy
                });
            }
            // console.log(JSON.stringify(queue));
        } else if (d == 'e') {
            // case: pointer is pointing to the east
            let temp = [...path];
            let v = [...visited];
            if (i + 1 < n && v.indexOf([i + 1, j].toString()) == -1) {
                temp.push('r');
                queue.push({
                    i: i,
                    j: j,
                    d: 's',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (i - 1 >= 0 && v.indexOf([i - 1, j].toString()) == -1) {
                temp.push('l');
                queue.push({
                    i: i,
                    j: j,
                    d: 'n',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (v.indexOf([i, j + 1].toString()) == -1) {
                temp.push('f');
                let vcopy = [...v];
                vcopy.push([i, j + 1].toString());
                queue.push({
                    i: i,
                    j: j + 1,
                    d: 'e',
                    p: p - 1,
                    path: temp,
                    visited: vcopy
                });
            }
            // console.log(JSON.stringify(queue));
        } else if (d == 'w') {
            // case: pointer is pointing to the west
            let temp = [...path];
            let v = [...visited];
            if (i - 1 >= 0 && v.indexOf([i - 1, j].toString()) == -1) {
                temp.push('r');
                queue.push({
                    i: i,
                    j: j,
                    d: 'n',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (i + 1 < n && v.indexOf([i + 1, j].toString()) == -1) {
                temp.push('l');
                queue.push({
                    i: i,
                    j: j,
                    d: 's',
                    p: p - 1,
                    path: temp,
                    visited: v
                });
            }
            temp = [...path];
            if (v.indexOf([i, j - 1].toString()) == -1) {
                temp.push('f');
                let vcopy = [...v];
                vcopy.push([i, j - 1].toString());
                queue.push({
                    i: i,
                    j: j - 1,
                    d: 'w',
                    p: p - 1,
                    path: temp,
                    visited: vcopy
                });
            }
            // console.log(JSON.stringify(queue));
        }
    }
    return filterSols(solutions);
};

// Function to filter all solutions and fiend the most efficient
function filterSols(solutionsArray) {
    if (solutionsArray.length == 0) {
        // return empty array if didn't find a valid solution
        return []
    };

    var minSol = solutionsArray[0].length;
    var solution = solutionsArray[0];

    for (let elem of solutionsArray) {
        if (elem.length < minSol) {
            minSol = elem.length;
            solution = elem;
        }
    }

    return solution;
};